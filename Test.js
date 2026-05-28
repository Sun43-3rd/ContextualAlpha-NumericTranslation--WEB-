
function Reduced(x){
    return Math.floor(x).toString().split('').map((x) => Number(x)).reduce((a, b) => a + b)
}

function GetCells(ids){
    return ids.map((x) => document.getElementById(x))
}

function Astro(subject){
    const bounds = [];

    for(let i = 1; i <= 12; i++){
        
        bounds.push((subject * i / 12).toFixed(5))
    
    }

    const bounds_cut = bounds.map((x) => x.toString()).map((x) => x.split('').filter((y, i, ar) => i < x.indexOf('.') && y !== ',').map((z) => Number(z)).filter((b) => isNaN(b) === false))
    const bounds_reduce = bounds_cut.map((x) => Reduced(x.join('')))
    const bounds_reduce2 = bounds_reduce.map((x) => Reduced(x))
    const bounds_reduce3 = bounds_reduce2.map((x) => Reduced(x))

    return [bounds, bounds_cut, bounds_reduce, bounds_reduce2, bounds_reduce3]
}

const Alphas = {
    'Latin': {
        'Alpha': ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'], 
        'Ordinal': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26], 
        'Reduced':[1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8], 
        'KV': [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 11, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 22, 5, 6, 7, 8]
        }
    };

const search = document.getElementById('Interactive-Search')
const law = document.getElementById("calc_law")
const filetype = document.getElementById('calc_filetype')
const calc_download = document.getElementById('calc_download')
const calc_results = document.getElementById('calc_results')
const regex_operators = /[\/\(\)\^+\*\-]/g;
const regex_other = /(?<![.!?;]) /g
const regex_puncutuation = /([.!?;])(?=.*[.!?;])/g;
const regex_split = /\d+|[^\d\s]/g


const direct = document.getElementById('')

function Translate(){
    const string = search.innerText.toUpperCase().replace(/\s*([+\-*/])\s*/g, '$1').replace(regex_other, ' + ').replace(regex_puncutuation, ' + ')
    const operators = string.match(regex_operators)
    const a = string.match(regex_split).filter((x) => x != ' ' && x != '\n')
    console.log(a)
    const b = a.map((x) => (operators !== null && operators.indexOf(x) !== -1 ) || !isNaN(x) ?
     [' ', x, ' '] : Alphas?.['Latin'][law.selectedOptions[0].label][Alphas.Latin.Alpha.indexOf(x)]).filter((x) => x !== undefined).flat(2).filter((x) => x != ' ')
    
    const equation = string
    const equation_tr = b.join('')
    const calc = eval;

    console.log(b)

    const translation = operators !== null ? calc(b.join('')) : b.join('')
    const translation_reduced = Reduced(translation)
    const translation_reduced2 = Reduced(translation_reduced)
    const translation_str = translation.toString() + " : " + translation_reduced + " : " + translation_reduced2;
   
    console.log([equation], [equation_tr],[translation_str], [Astro(translation)], 
)

return [equation, equation_tr, translation_str, Astro(translation)]


}

function download(type, content, filename = 'data') {

    const blob = new Blob([content], {
        'json': { type: 'application/json' },
        'txt' : { type: 'text/plain'},
        'csv' : { type: 'text/csv'}
    }[type] 
    );

    const url = URL.createObjectURL(blob);
    const a   = document.createElement('a');
    a.href   = url;
    a.download = `${filename}.${type}`;          
    document.body.appendChild(a);   

    a.click();                     
    document.body.removeChild(a);   

  
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

const Results = {
    'entry_points': {
        'SearchLength' : document.getElementById('Results-SearchLength') ,
        'ZodiacalLowerBoundaries': GetCells(['C8', 'D8', 'E8', 'F8', 'G8', 'H8', 'I8', 'J8', 'K8', 'L8', 'M8', 'N8']),
        'ZodiacalUpperBoundaries': GetCells(['C8', 'D8', 'E8', 'F8', 'G8', 'H8', 'I8', 'J8', 'K8', 'L8', 'M8', 'N8']),
        'Translation': document.getElementById('Results-Translation'),
        'TranslationSimplified': document.getElementById('Results-TranslationSimplified'),
        'ZodiacalTranslation': document.getElementById('Results-ZodiacalTranslation'),
        'ZodiacalTranslationEXT': document.getElementById('Results-ZodiacalTranslationEXT'),
    }
    
    'update' : (data) => {
        const data = Translate()
        Results['SearchLength'] = search.innerText.length;
        Results['ZodiacalLowerBoundaries'] = [0, ...data[3][0]].slice(0, this.length - 1);
        Results['ZodiacalUpperBoundaries'] = data[3][0];
        Results['Translation'] = `${data[1]}`;
        Results['TranslationSimplified'] = `${data[2]}`;
        Results['ZodiacalTranslation'] = ; 
        Results['ZodiacalTranslationEXT'] = 'NAN'; 
        
    },
    
    'release' : () => {
        for ( const point in Results['entrypoint'] ){

                if(Array.isArray(point)){
                    point.map((x, i) => 
                        Array.prototype.filter.call(x.children, (y) => y.tagName === 'span')[0].innerText = Results[point][i]
                    )
                }
                else{
                    Array.prototype.filter.call(point.children, (x) => x.tagName === 'span')[0].innerText = Results[point]
                }
            
        }
            
    }

    
}


const ShowFile = 
{

            'JSON' : (data, name, law) => {
            
                
                const json = 
                    `{  
                        "Subject" : "${name}",
                        "Law" : "${law}",
                        
                        "Data" : {
                            "Equation" : "${data[0]}", 
                            "Equation_Translated" : "${data[1]}", 
                            "Translation" : "${data[2]}",  
                            
                            "Astrology" : {
                                "Aries" : "${data[3][0][0]} / ${data[3][2][0]} / ${data[3][3][0]} / ${data[3][4][0]}",
                                "Taurus" : "${data[3][0][1]} / ${data[3][2][1]} / ${data[3][3][1]} / ${data[3][4][1]}",
                                "Gemini" : "${data[3][0][2]} / ${data[3][2][2]} / ${data[3][3][2]} / ${data[3][4][2]}",
                                "Cancer" : "${data[3][0][3]} / ${data[3][2][3]} / ${data[3][3][3]} / ${data[3][4][3]}",
                                "Leo" : "${data[3][0][4]} / ${data[3][2][4]} / ${data[3][3][4]} / ${data[3][4][4]}",
                                "Virgo" : "${data[3][0][5]} / ${data[3][2][5]} / ${data[3][3][5]} / ${data[3][4][5]}",
                                "Libra" : "${data[3][0][6]} / ${data[3][2][6]} / ${data[3][3][6]} / ${data[3][4][6]}",
                                "Scorpio" : "${data[3][0][7]} / ${data[3][2][7]} / ${data[3][3][7]} / ${data[3][4][7]}",
                                "Sagittarius" : "${data[3][0][8]} / ${data[3][2][8]} / ${data[3][3][8]} / ${data[3][4][8]}",
                                "Capricorn" : "${data[3][0][9]} / ${data[3][2][9]} / ${data[3][3][9]} / ${data[3][4][9]}",
                                "Aquarius" : "${data[3][0][10]} / ${data[3][2][10]} / ${data[3][3][10]} / ${data[3][4][10]}",
                                "Pisces" : "${data[3][0][11]} / ${data[3][2][11]} / ${data[3][3][11]} / ${data[3][4][11]}"
        
                            }
                        }
                    }`
    
                
                
                calc_results.innerText = json
                
            },
    
            'Text' : (data, name, law) => {
                const text =  `
                        Subject = ${name}, Law = ${law},

                        Equation = ${data[0]}
                        Equation_Translated = ${data[1]} 
                        Translation = ${data[2]}
                        
                        Astrology
                            Aries = ${data[3][0][0]} / ${data[3][2][0]} / ${data[3][3][0]} / ${data[3][4][0]}
                            Taurus = ${data[3][0][1]} / ${data[3][2][1]} / ${data[3][3][1]} / ${data[3][4][1]}
                            Gemini = ${data[3][0][2]} / ${data[3][2][2]} / ${data[3][3][2]} / ${data[3][4][2]}
                            Cancer = ${data[3][0][3]} / ${data[3][2][3]} / ${data[3][3][3]} / ${data[3][4][3]}
                            Leo = ${data[3][0][4]} / ${data[3][2][4]} / ${data[3][3][4]} / ${data[3][4][4]}
                            Virgo" = ${data[3][0][5]} / ${data[3][2][5]} / ${data[3][3][5]} / ${data[3][4][5]}
                            Libra" = ${data[3][0][6]} / ${data[3][2][6]} / ${data[3][3][6]} / ${data[3][4][6]}
                            Scorpio = ${data[3][0][7]} / ${data[3][2][7]} / ${data[3][3][7]} / ${data[3][4][7]}
                            Sagittarius = ${data[3][0][8]} / ${data[3][2][8]} / ${data[3][3][8]} / ${data[3][4][8]}
                            Capricorn = ${data[3][0][9]} / ${data[3][2][9]} / ${data[3][3][9]} / ${data[3][4][9]}
                            Aquarius = ${data[3][0][10]} / ${data[3][2][10]} / ${data[3][3][10]} / ${data[3][4][10]}
                            Pisces = ${data[3][0][11]} / ${data[3][2][11]} / ${data[3][3][11]} / ${data[3][4][11]}
    
                        `
    
                
                
                calc_results.innerText = text
                
            },

            'CSV' : (data, name, law) => {
                const text =  `
                ${name},${law},Equation,Equation_Translated,Translation,Astrology,Aries,Taurus,Gemini,Cancer,Leo,Virgo,Libra,Scorpio,Sagittarius,Capricorn,Aquarius,Pisces\n-${name},-${law},${data[2]},${data[0]},${data[1]},No_Reduction,${data[3][0].join(',')}\n-${name},-${law},,,,Reduced_1,${data[3][2].join(',')}\n-${name},-${law},,,,Reduced_2,${data[3][3].join(',')}\n-${name},-${law},,,,Reduced_3,${data[3][4].join(',')}
                `
    
            
                
                calc_results.innerText = text
            }
                
        }

function SetUp(){

    // ELEMENT FEATURES 
    
    td.map((x) => {
        
    // when click focus on textbox(span), if no textbox add one. 
        
        x.addEventListener('click', (event) => {
            if(!x.classList.contains('non-interactive')){
                if(!x.hasChildNodes()){
                    x.classList.add('interactive')
                    const new_textbox = document.createElement('span');
                    x.appendChild(new_textbox)
                    new_textbox.focus = true;
                } else {}
                    
            } else {}
        }
        
    // while the td is being typed in 

        x.addEventListener('keydown', (event) => {
            if(!isNaN(x.innerText)){
                x.setAttribute('type', 'number')
            }
            if(isNaN(x.innerText)){
                x.setAttribute('type', 'text')
            }
        }
    }) 

    
    filetype.addEventListener('change', (event) => {
        const data = Translate()
        ShowFile[filetype.selectedOptions[0].label](data, search.innerText.toString(), law.selectedOptions[0].label)
    })
    
    calc_download.addEventListener('click', (event) => {
        const sub = search.innerText.toString().replace(/\s*([+\-*/])\s*/g, '_').replaceAll(regex_other, '_').replaceAll(regex_puncutuation, '_').replaceAll('.', '_')
        
        const data = calc_results.innerText;
        download(filetype.selectedOptions[0].value, data, `CANT(${law.selectedOptions[0].label})-${sub}`)
        search.focus()
    }) 
    
    search.addEventListener('keydown', (event) => {
        if(event.key === ''){
            event.preventDefault() 
             // Change Results 
            Results.update()
            Results.release()

            ShowFile[filetype.selectedOptions[0].label](data, search.innerText.toString(), law.selectedOptions[0].label)
            
        }
        
    })

    // Load Document 

    
    
}


window.onload = 
SetUp()
