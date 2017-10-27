console.log('Tugas Program 2 - Fuzzy Logic')

const INPUTVALUE = require('./input.json')
const SOLVEVALUE = require('./solve.json')

const EMOSI = [0, 25, 35, 70, 80, 97]
const PROVOKASI = [0, 25, 40, 65, 80, 105]

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
			result[count]['h']['value'] = Math.min(emosi[i], provokasi[j])

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
		
		hoax['jenis'] === 'iya' ? IYA.push(hoax['value']) : undefined
		hoax['jenis'] === 'tidak' ? TIDAK.push(hoax['value']) : undefined
		
	}
	// console.log({ IYA, TIDAK })
	
	const iya = Math.max(...IYA)
	const tidak = Math.max(...TIDAK)
	return { iya, tidak }
}

const testCase = (rules) => {
	let count = 0

	for (var i = 0; i < rules.length; i++) {	
		const result = testSingle(rules[i]['emosi'], rules[i]['provokasi'], rules[i]['hoax'])
		let note = result ? '' : 'salah'
		console.log(`BO${i+1} - E: ${rules[i].emosi}, P: ${rules[i].provokasi} = ${result} ${note}`)
		result ? count++ : undefined
		i === 19 ? console.log('---') : undefined
	}
	console.log(`Benar : ${count}`)
	console.log(`Salah : ${rules.length-count}`)

}

const testSingle = (emosi, provokasi, expect) => {
	let Emosi = fuzzification(emosi, EMOSI)
	let Provokasi = fuzzification(provokasi, PROVOKASI)
	let Inference = inference(Emosi, Provokasi)
	let Defuzi = defuzzification(Inference)
	// console.log(Defuzi['iya'])
	// console.log(Defuzi['tidak'])
		
	return (Defuzi['iya'] > Defuzi['tidak']) === expect ? true: false
}

testCase(INPUTVALUE)
// testCase(SOLVEVALUE)

// const emosi = fuzzification(27, EMOSI)
// const provokasi = fuzzification(79, PROVOKASI)
// const testInference = inference(emosi, provokasi)
// const testDefuzzi = defuzzification(testInference)
// console.log(JSON.stringify({ emosi, provokasi }, {}, 4))
// console.log(JSON.stringify({ testInference }, {}, 2))
// console.log(JSON.stringify({ testDefuzzi }, {}, 2))
