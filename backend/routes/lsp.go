package routes

import (
	"log"
	"net/http"
	"os/exec"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{}

func LspHandler(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("Error al actualizar a WebSocket:", err)
		return
	}
	defer conn.Close()

	cmd := exec.Command("pyright-langserver", "--stdio")
	stdin, err := cmd.StdinPipe()
	if err != nil {
		log.Println("Error al obtener stdin:", err)
		return
	}
	stdout, err := cmd.StdoutPipe()
	if err != nil {
		log.Println("Error al obtener stdout:", err)
		return
	}

	if err := cmd.Start(); err != nil {
		log.Println("Error al iniciar Pyright:", err)
		return
	}

	go func() {
		for {
			_, message, err := conn.ReadMessage()
			if err != nil {
				log.Println("Error al leer mensaje de WebSocket:", err)
				return
			}
			_, err = stdin.Write(message)
			if err != nil {
				log.Println("Error al escribir en stdin de Pyright:", err)
				return
			}
		}
	}()

	buf := make([]byte, 1024)
	for {
		n, err := stdout.Read(buf)
		if err != nil {
			log.Println("Error al leer de stdout de Pyright:", err)
			return
		}
		err = conn.WriteMessage(websocket.TextMessage, buf[:n])
		if err != nil {
			log.Println("Error al escribir en WebSocket:", err)
			return
		}
	}
}
