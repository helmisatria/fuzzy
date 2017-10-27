
console.log('Tugas Program 2 - Fuzzy Logic')

const testCase = require('./input.json')

const EMOSI = {
	rendah: [0,45],
	sedang: [20, 80],
	tinggi: [65, 100]
}

const EMOSI2 = [0, 20, 45, 65, 80, 100]

const PROVOKASI = {
	rendah: [0, 40],
	sedang: [10, 90],
	tinggi: [70, 100]
}

const PROVOKASI2 = [0, 10, 40, 70, 90, 100]

const HOAX = {
	tidak: 40,
	iya: 80
}

const fuzzyRule = [
	{
		p: { jenis: 'rendah', value: undefined },
		e: { jenis: 'rendah', value: undefined },
		h: { jenis: 'tidak', value: undefined }
	}, 
	{
		p: { jenis: 'rendah', value: undefined },
		e: { jenis: 'sedang', value: undefined },
		h: { jenis: 'tidak', value: undefined }
	}, 
	{
		p: { jenis: 'rendah', value: undefined },
		e: { jenis: 'tinggi', value: undefined },
		h: { jenis: 'iya', value: undefined }
	}, 
	{
		p: { jenis: 'sedang', value: undefined },
		e: { jenis: 'rendah', value: undefined },
		h: { jenis: 'tidak', value: undefined }
	}, 
	{
		p: { jenis: 'sedang', value: undefined },
		e: { jenis: 'sedang', value: undefined },
		h: { jenis: 'tidak', value: undefined }
	},
	{
		p: { jenis: 'sedang', value: undefined },
		e: { jenis: 'tinggi', value: undefined },
		h: { jenis: 'iya', value: undefined }
	},
	{
		p: { jenis: 'tinggi', value: undefined },
		e: { jenis: 'rendah', value: undefined },
		h: { jenis: 'iya', value: undefined }
	},
	{
		p: { jenis: 'tinggi', value: undefined },
		e: { jenis: 'sedang', value: undefined },
		h: { jenis: 'iya', value: undefined }
	},
	{
		p: { jenis: 'tinggi', value: undefined },
		e: { jenis: 'tinggi', value: undefined },
		h: { jenis: 'iya', value: undefined }
	}
]

const fuzzification = (crisp, category) => {
	let temp = {
		rendah: 0,
		sedang: 0,
		tinggi: 0
	}
	let tmpArray = [
		
	]
	// let result = undefined
	if (crisp <= category[1]) {
		temp.rendah = 1
		

	} else if (crisp <= category[2]) {
		temp.rendah = (category[2] - crisp)/(category[2] - category[1])
		temp.sedang = (crisp - category[1])/(category[2] - category[1])
		

	} else if (crisp <= category[3]) {
		temp.sedang = 1

	} else if (crisp <= category[4]) {
		temp.rendah = (category[4] - crisp)/(category[4] - category[3])
		temp.sedang = (crisp - category[3])/(category[4] - category[3])

	} else if (crisp <= category[5]) {
		temp.tinggi = 1
	}
	return temp
}


console.log(JSON.stringify(fuzzification(97, EMOSI2), {}, 2))
console.log(JSON.stringify(fuzzification(74, PROVOKASI2), {}, 2))

const sampleEmosi = fuzzification(97, EMOSI2)
const sampleProvikasi = fuzzification(74, PROVOKASI2)

const inference = (emosi, provokasi) => {
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			
			
		}
		
	}
}