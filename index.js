console.log('Tugas Program 2 - Fuzzy Logic')

const INPUTVALUE = require('./input.json')
const SOLVEVALUE = require('./solve.json')

const EMOSI = [0, 10, 45, 50, 99, 100]
const PROVOKASI = [0, 10, 30, 40, 96, 100]

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
		h: { jenis: 'tidak', value: undefined }
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
		h: { jenis: 'tidak', value: undefined }
	},
	{
		p: { jenis: 'tinggi', value: undefined },
		e: { jenis: 'sedang', value: undefined },
		h: { jenis: 'tidak', value: undefined }
	},
	{
		p: { jenis: 'tinggi', value: undefined },
		e: { jenis: 'tinggi', value: undefined },
		h: { jenis: 'iya', value: undefined }
	}
]

const fuzzification = (crisp, category) => {
	let tmpArray = [
		0, 0, 0
	]

	if (crisp <= category[1]) {

		tmpArray[0] = 1

	} else if (crisp <= category[2]) {

		tmpArray[0] = (category[2] - crisp)/(category[2] - category[1])
		tmpArray[1] = (crisp - category[1])/(category[2] - category[1])

	} else if (crisp <= category[3]) {

		tmpArray[1] = 1

	} else if (crisp <= category[4]) {

		tmpArray[1] = (category[4] - crisp)/(category[4] - category[3])
		tmpArray[2] = (crisp - category[3])/(category[4] - category[3])

	} else if (crisp <= category[5]) {
		tmpArray[2] = 1
	}

	return tmpArray
}

const inference = (emosi, provokasi) => {
	let result = JSON.parse(JSON.stringify(fuzzyRule))
	let count = 0
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			result[count]['p']['value'] = emosi[i]
			result[count]['e']['value'] = provokasi[j]
			result[count]['h']['value'] = Math.max(emosi[i], provokasi[j])

			count++
		}
	}
	return result
}

const defuzzification = (fuzzyset) => {
	
	const IYA = []
	const TIDAK = []
	for (var i = 0; i < fuzzyset.length; i++) {
		let hoax = fuzzyset[i]['h']
		
		hoax['value'] && hoax['jenis'] == 'iya' ? IYA.push(hoax['value']) : 0
		hoax['value'] && hoax['jenis'] == 'tidak' ? TIDAK.push(hoax['value']) : 0

	}
	const iya = Math.min(...IYA)
	const tidak = Math.min(...TIDAK)
	return { iya, tidak }
}

const testCase = (rules) => {
	let count = 0

	for (var i = 0; i < rules.length; i++) {	
		const result = testSingle(rules[i]['emosi'], rules[i]['provokasi'], rules[i]['hoax'])
		let note = result == rules[i]['hoax'] ? '' : 'salah'
		console.log(`BO${i+1} - E: ${rules[i].emosi}, P: ${rules[i].provokasi} = ${result} ${note}`)
		result == rules[i]['hoax'] ? count++ : undefined
		
	}
	console.log(`Benar : ${count}`)
	console.log(`Salah : ${rules.length-count}`)

}

const testSingle = (emosi, provokasi, expect) => {
	let Emosi = fuzzification(emosi, EMOSI)
	let Provokasi = fuzzification(provokasi, PROVOKASI)
	let Inference = inference(Emosi, Provokasi)
	let Defuzi = defuzzification(Inference)
	console.log(Defuzi['iya'])
	console.log(Defuzi['tidak'])
		
	return (Defuzi['iya'] > Defuzi['tidak']) ? 'iya': 'tidak'
}

// testCase(INPUTVALUE)
// testCase(SOLVEVALUE)

const test = testSingle(40, 65)

console.log(test)