import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  codigo: string = '';
  inputs: string = '';
  output: string = '';

  pyodide: any;

  async ngOnInit() {
    // @ts-ignore
    this.pyodide = await loadPyodide();
    console.log('Pyodide cargado desde CDN');
  }

  async ejecutarCodigo() {
    try {
      const inputLines = this.inputs.split('\n');
      let inputIndex = 0;

   
      const inputFunction = (prompt = '') => {
        if (inputIndex >= inputLines.length) {
          throw new Error('No hay más inputs disponibles');
        }
        const value = inputLines[inputIndex];
        inputIndex++;
        return value;
      };

      
      this.pyodide.globals.set('input', inputFunction);

      
      this.output = '';

      
      this.pyodide.setStdout({
        batched: (text: string) => {
          this.output += text;
        }
      });

    
      await this.pyodide.runPythonAsync(this.codigo);

    } catch (error) {
      this.output = `Error: ${error}`;
    }
  }



}
