const fs = require('fs')

const Contenedor = class {
	constructor(fileName){
		this.filename = fileName
	}

	async save(articulo){
		try {
			if (!articulo) { throw 'Objeto sin datos'}
			this.getAll()
			.then(articulos => {
				if (!articulos.length) {
					articulo.id = 1
					articulos.push(articulo)
					// console.table(articulos)
					fs.promises.writeFile(this.filename, JSON.stringify(articulos), 'utf8')
					return articulo.id

				}
				articulo.id = articulos[articulos.length - 1].id + 1
				articulos.push(articulo)
				fs.promises.writeFile(this.filename, JSON.stringify(articulos), 'utf8')
				return articulo.id
			})
			.then(response => console.log(response))

		} catch(e) {
			console.log(e);
		}
	}

	async getById(id){
		try {
			const articulos = await this.getAll()
			const articulo = await articulos.find((articulo) => {
				return articulo.id == id
			})
			if (!articulo) { 
				console.log(null)
				return
			}
			console.log(articulo)
			return articulo	
		} catch(e) {
			console.log(e);
		}
	}

	async getAll(){
		try {
			const fileData = await fs.promises.readFile(this.filename, 'utf8')
			if (!fileData) { return [] }
			 return await Object.values(JSON.parse(fileData))  
		} catch(e) {
			console.log(e.message);
		}
	}

	async deleteById(id){
		const articulos = await this.getAll()
		if (!articulos) { 
			return null
		}
		// console.log('id pasado como parametro ' + id)
		// console.table(articulos)
		const indiceArray = await articulos.findIndex((element) => {
			return element.id == id
		})
		// console.log(indiceArray)
		if (indiceArray !== -1) {
			articulos.splice(indiceArray, 1)
			const deleteArti = fs.promises.writeFile(this.filename, articulos.length == 0 ? "" : JSON.stringify(articulos))
			console.log(`Articulo con id ${id} eliminado`)	
		}else{
			console.log(`No existe articulo con id ${id}`)
		}
		
		
		
	}

	async deleteAll(){
		const deleteFile = await fs.promises.writeFile(this.filename,"")
		const filesDeletes = await deleteFile
		if (!filesDeletes) {
			console.log('Archivo vacio')
			return []
		}
	}

}


module.exports = Contenedor