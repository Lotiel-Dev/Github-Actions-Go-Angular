package routes

import (
	"fmt"
	"net/http"
	"os/exec"
)

func Homehandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("esto vien de la carpeta routesss"))
}

func VerificarPythonHandler(w http.ResponseWriter, r *http.Request) {
	rutaArchivo := "test.py" // En la práctica lo recibes por POST o desde un path

	cmd := exec.Command("pyright", rutaArchivo)
	salida, err := cmd.CombinedOutput()
	if err != nil {
		http.Error(w, fmt.Sprintf("Errores detectados:\n%s", salida), http.StatusBadRequest)
		return
	}

	w.Write([]byte(fmt.Sprintf("Sin errores:\n%s", salida)))
}
