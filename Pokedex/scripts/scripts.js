const colorMap = new Map([
  ['normal', '#d3c59c'],
  ['fire', '#f39123'],
  ['water', '#239ef3'],
  ['grass', '#68f323'],
  ['electric', '#f3e623'],
  ['ice', '#affaf3'],
  ['fighting', '#cd2b07'],
  ['poison', '#b2387a'],
  ['ground', '#e6c861'],
  ['flying', '#d6b9f9'],
  ['psychic', '#eb91ac'],
  ['bug', '#9fc867'],
  ['rock', '#d5c153'],
  ['ghost', '#665d74'],
  ['dark', '#604736'],
  ['dragon', '#6d27cc'],
  ['steel', '#c9c9c9'],
  ['fairy', '#f3c7d4']
]);

function testPoke() {

  // testing dom manipulaiton

  var para = document.createElement("P");
  para.innerHTML = "This is a test string to be erased.";
  document.getElementById("info").appendChild(para);

  if(document.styleSheets[0]) {
      console.log("It found stylesheet 0...");
  }

}



function getPokemon(){

  var xhttp = new XMLHttpRequest(), 
    method = 'GET', 
    url = 'https://pokeapi.co/api/v2/type/';

  var e = document.getElementById("types");
  var type = e.value;

  if(type == 'default') {

    document.getElementById("info").innerHTML = '<p>Please select a pokemon type!</p>';

  } else {
    url += type;

    xhttp.onreadystatechange = function() {

      if(xhttp.readyState === XMLHttpRequest.DONE) {

        if (this.readyState == 4 && this.status == 200) {
        
          let data = JSON.parse(this.responseText);

          document.getElementById("info").appendChild(buildNameList(data));
          document.getElementById("info").appendChild(buildBtn());


        } else {

          document.getElementById("info").innerHTML = "failed";

        }
      } 
    };
  
    xhttp.open(method, url, true);
    xhttp.send();
  }
}

/* Constructs the list of names of the pokemon */
function buildNameList(data) {
    
    let div = document.createElement("DIV");
    div.setAttribute("class", "wrapperList");

    data.pokemon.forEach(element => {

        let div2 = document.createElement("DIV");
        div2.setAttribute("class", "wrapper1");

        let span = document.createElement("SPAN");
        span.setAttribute("class", "square individual");

        let a = document.createElement("A");
        a.setAttribute("class", "ninth before after");
        a.setAttribute("href", "#");
        a.setAttribute("onclick", "singlePokemon(this)");
        a.innerHTML = element.pokemon.name;

        span.appendChild(a);
        div2.appendChild(span);
        div.appendChild(div2);
    });

    return div;
}

/* Retrieve individual pokemon info */
function singlePokemon(link) {

    // Get rid of previous pokemon list
    document.getElementById("info").innerHTML = "";

    var xhttp = new XMLHttpRequest(), 
    method = 'GET', 
    url = 'https://pokeapi.co/api/v2/pokemon/' + link.innerText;

    xhttp.onreadystatechange = function() {

      if(xhttp.readyState === XMLHttpRequest.DONE) {

        if (this.readyState == 4 && this.status == 200) {
        
          let data = JSON.parse(this.responseText);

          document.getElementById("info").appendChild(buildBio(data));
          document.getElementById("info").appendChild(buildChar(data));
          document.getElementById("info").appendChild(buildBtn());
    
        } else {

          document.getElementById("info").innerHTML = "failed";

        }
      } 
    };
  
    xhttp.open(method, url, true);
    xhttp.send();
}

/* builds biography section */
function buildBio(data) {

    let divBio = document.createElement("DIV");
    divBio.setAttribute("class", "bio");

    let divId = document.createElement("DIV");
    divId.setAttribute("class", "identity");

    let pName = document.createElement("P");
    pName.innerHTML = "<strong>Name: </strong>" + data.name.toString();
    divId.appendChild(pName);

    let pId = document.createElement("P");
    pId.innerHTML = "<strong>ID: </strong>" + data.id.toString();
    divId.appendChild(pId);

    let divAtt = document.createElement("DIV");
    divAtt.setAttribute("class", "attributes");

    let pHeight = document.createElement("P");
    pHeight.innerHTML = "<strong>Height: </strong>" + data.height.toString();
    divAtt.appendChild(pHeight);

    let pWeight = document.createElement("P");
    pWeight.innerHTML = "<strong>Weight: </strong>" + data.weight.toString();
    divAtt.appendChild(pWeight);

    divBio.appendChild(divId);
    divBio.appendChild(divAtt);

    console.log(data);
    return divBio;
}

/* builds character section */
function buildChar(data) {

    let divChar = document.createElement("DIV");
    divChar.setAttribute("class", "character");
    // let a = document.createElement("A");
    // a.setAttribute("name", "List");
    // divChar.appendChild(a);

    // Type Headings
    let h = document.createElement("H3");
    h.innerHTML = 'Types: ';
    divChar.appendChild(h);
    h = document.createElement("H2");
    h.innerHTML = 'Types: ';
    divChar.appendChild(h);
    h = document.createElement("H1");
    h.innerHTML = 'Types: ';
    divChar.appendChild(h);

    // Type List
    let listT = document.createElement("UL");
    listT.setAttribute("class", "type");
    let li;
    data.types.forEach(element => {
      li = document.createElement("LI");
      li.innerHTML = element.type.name;
      listT.appendChild(li);
    });
    divChar.appendChild(listT);

    // Ability Headings
    h = document.createElement("H3");
    h.innerHTML = 'Abilities: ';
    divChar.appendChild(h);
    h = document.createElement("H2");
    h.innerHTML = 'Abilities: ';
    divChar.appendChild(h);
    h = document.createElement("H1");
    h.innerHTML = 'Abilities: ';
    divChar.appendChild(h);

    // Ability List
    let listA = document.createElement("UL");
    listA.setAttribute("class", "abilities");
    data.abilities.forEach(element => {
      li = document.createElement("LI");
      li.innerHTML = element.ability.name;
      listA.appendChild(li);
    });
    divChar.appendChild(listA);

    // Move Headings
    h = document.createElement("H3");
    h.innerHTML = 'Moves: ';
    divChar.appendChild(h);
    h = document.createElement("H2");
    h.innerHTML = 'Moves: ';
    divChar.appendChild(h);
    h = document.createElement("H1");
    h.innerHTML = 'Moves: ';
    divChar.appendChild(h);

    // Moves List
    let listM = document.createElement("UL");
    listM.setAttribute("class", "moves");
    data.moves.forEach(element => {
      li = document.createElement("LI");
      li.innerHTML = element.move.name;
      listM.appendChild(li);
    });
    divChar.appendChild(listM);

    return divChar;
}

/* Build 'to Top' btn */
function buildBtn(){

    let div = document.createElement("DIV");
    div.setAttribute("id", "return");
    let a = document.createElement("A");
    a.setAttribute("href", "#Top");
    a.innerHTML = 'to Top';
    div.appendChild(a);

    return div;
}

/* Changes the color based on type selected */
function changeColor(color) {

  // Get rid of previous pokemon list
  document.getElementById("info").innerHTML = "";

  if(color == 'default') {
    // What to do here?
    // Set a default color?
  } else {

    // document.getElementsByClassName("header")[0].style.backgroundColor = colorMap.get(color);

    // Sets css root variable color for links
    document.querySelector(':root').style.setProperty('--names', colorMap.get(color));
  }
}


//ToDo:
// add 'Back To Top Button'
// fix bio box design
// look into scaling dropdown on large screens
// finalize colors
// finalize BigfootBinary svg?

// ToDo card effect design, stacking
// codepen.io/bramus/pen/PobmGme



// raw data
const pikachu = {
  "abilities": [
      {
          "ability": {
              "name": "static",
              "url": "https://pokeapi.co/api/v2/ability/9/"
          },
          "is_hidden": false,
          "slot": 1
      },
      {
          "ability": {
              "name": "lightning-rod",
              "url": "https://pokeapi.co/api/v2/ability/31/"
          },
          "is_hidden": true,
          "slot": 3
      }
  ],
  "base_experience": 112,
  "forms": [
      {
          "name": "pikachu",
          "url": "https://pokeapi.co/api/v2/pokemon-form/25/"
      }
  ],
  "game_indices": [
      {
          "game_index": 84,
          "version": {
              "name": "red",
              "url": "https://pokeapi.co/api/v2/version/1/"
          }
      },
      {
          "game_index": 84,
          "version": {
              "name": "blue",
              "url": "https://pokeapi.co/api/v2/version/2/"
          }
      },
      {
          "game_index": 84,
          "version": {
              "name": "yellow",
              "url": "https://pokeapi.co/api/v2/version/3/"
          }
      },
      {
          "game_index": 25,
          "version": {
              "name": "gold",
              "url": "https://pokeapi.co/api/v2/version/4/"
          }
      },
      {
          "game_index": 25,
          "version": {
              "name": "silver",
              "url": "https://pokeapi.co/api/v2/version/5/"
          }
      },
      {
          "game_index": 25,
          "version": {
              "name": "crystal",
              "url": "https://pokeapi.co/api/v2/version/6/"
          }
      },
      {
          "game_index": 25,
          "version": {
              "name": "ruby",
              "url": "https://pokeapi.co/api/v2/version/7/"
          }
      },
      {
          "game_index": 25,
          "version": {
              "name": "sapphire",
              "url": "https://pokeapi.co/api/v2/version/8/"
          }
      },
      {
          "game_index": 25,
          "version": {
              "name": "emerald",
              "url": "https://pokeapi.co/api/v2/version/9/"
          }
      },
      {
          "game_index": 25,
          "version": {
              "name": "firered",
              "url": "https://pokeapi.co/api/v2/version/10/"
          }
      },
      {
          "game_index": 25,
          "version": {
              "name": "leafgreen",
              "url": "https://pokeapi.co/api/v2/version/11/"
          }
      },
      {
          "game_index": 25,
          "version": {
              "name": "diamond",
              "url": "https://pokeapi.co/api/v2/version/12/"
          }
      },
      {
          "game_index": 25,
          "version": {
              "name": "pearl",
              "url": "https://pokeapi.co/api/v2/version/13/"
          }
      },
      {
          "game_index": 25,
          "version": {
              "name": "platinum",
              "url": "https://pokeapi.co/api/v2/version/14/"
          }
      },
      {
          "game_index": 25,
          "version": {
              "name": "heartgold",
              "url": "https://pokeapi.co/api/v2/version/15/"
          }
      },
      {
          "game_index": 25,
          "version": {
              "name": "soulsilver",
              "url": "https://pokeapi.co/api/v2/version/16/"
          }
      },
      {
          "game_index": 25,
          "version": {
              "name": "black",
              "url": "https://pokeapi.co/api/v2/version/17/"
          }
      },
      {
          "game_index": 25,
          "version": {
              "name": "white",
              "url": "https://pokeapi.co/api/v2/version/18/"
          }
      },
      {
          "game_index": 25,
          "version": {
              "name": "black-2",
              "url": "https://pokeapi.co/api/v2/version/21/"
          }
      },
      {
          "game_index": 25,
          "version": {
              "name": "white-2",
              "url": "https://pokeapi.co/api/v2/version/22/"
          }
      }
  ],
  "height": 4,
  "held_items": [
      {
          "item": {
              "name": "oran-berry",
              "url": "https://pokeapi.co/api/v2/item/132/"
          },
          "version_details": [
              {
                  "rarity": 50,
                  "version": {
                      "name": "ruby",
                      "url": "https://pokeapi.co/api/v2/version/7/"
                  }
              },
              {
                  "rarity": 50,
                  "version": {
                      "name": "sapphire",
                      "url": "https://pokeapi.co/api/v2/version/8/"
                  }
              },
              {
                  "rarity": 50,
                  "version": {
                      "name": "emerald",
                      "url": "https://pokeapi.co/api/v2/version/9/"
                  }
              },
              {
                  "rarity": 50,
                  "version": {
                      "name": "diamond",
                      "url": "https://pokeapi.co/api/v2/version/12/"
                  }
              },
              {
                  "rarity": 50,
                  "version": {
                      "name": "pearl",
                      "url": "https://pokeapi.co/api/v2/version/13/"
                  }
              },
              {
                  "rarity": 50,
                  "version": {
                      "name": "platinum",
                      "url": "https://pokeapi.co/api/v2/version/14/"
                  }
              },
              {
                  "rarity": 50,
                  "version": {
                      "name": "heartgold",
                      "url": "https://pokeapi.co/api/v2/version/15/"
                  }
              },
              {
                  "rarity": 50,
                  "version": {
                      "name": "soulsilver",
                      "url": "https://pokeapi.co/api/v2/version/16/"
                  }
              },
              {
                  "rarity": 50,
                  "version": {
                      "name": "black",
                      "url": "https://pokeapi.co/api/v2/version/17/"
                  }
              },
              {
                  "rarity": 50,
                  "version": {
                      "name": "white",
                      "url": "https://pokeapi.co/api/v2/version/18/"
                  }
              }
          ]
      },
      {
          "item": {
              "name": "light-ball",
              "url": "https://pokeapi.co/api/v2/item/213/"
          },
          "version_details": [
              {
                  "rarity": 5,
                  "version": {
                      "name": "ruby",
                      "url": "https://pokeapi.co/api/v2/version/7/"
                  }
              },
              {
                  "rarity": 5,
                  "version": {
                      "name": "sapphire",
                      "url": "https://pokeapi.co/api/v2/version/8/"
                  }
              },
              {
                  "rarity": 5,
                  "version": {
                      "name": "emerald",
                      "url": "https://pokeapi.co/api/v2/version/9/"
                  }
              },
              {
                  "rarity": 5,
                  "version": {
                      "name": "diamond",
                      "url": "https://pokeapi.co/api/v2/version/12/"
                  }
              },
              {
                  "rarity": 5,
                  "version": {
                      "name": "pearl",
                      "url": "https://pokeapi.co/api/v2/version/13/"
                  }
              },
              {
                  "rarity": 5,
                  "version": {
                      "name": "platinum",
                      "url": "https://pokeapi.co/api/v2/version/14/"
                  }
              },
              {
                  "rarity": 5,
                  "version": {
                      "name": "heartgold",
                      "url": "https://pokeapi.co/api/v2/version/15/"
                  }
              },
              {
                  "rarity": 5,
                  "version": {
                      "name": "soulsilver",
                      "url": "https://pokeapi.co/api/v2/version/16/"
                  }
              },
              {
                  "rarity": 1,
                  "version": {
                      "name": "black",
                      "url": "https://pokeapi.co/api/v2/version/17/"
                  }
              },
              {
                  "rarity": 1,
                  "version": {
                      "name": "white",
                      "url": "https://pokeapi.co/api/v2/version/18/"
                  }
              },
              {
                  "rarity": 5,
                  "version": {
                      "name": "black-2",
                      "url": "https://pokeapi.co/api/v2/version/21/"
                  }
              },
              {
                  "rarity": 5,
                  "version": {
                      "name": "white-2",
                      "url": "https://pokeapi.co/api/v2/version/22/"
                  }
              },
              {
                  "rarity": 5,
                  "version": {
                      "name": "x",
                      "url": "https://pokeapi.co/api/v2/version/23/"
                  }
              },
              {
                  "rarity": 5,
                  "version": {
                      "name": "y",
                      "url": "https://pokeapi.co/api/v2/version/24/"
                  }
              },
              {
                  "rarity": 5,
                  "version": {
                      "name": "omega-ruby",
                      "url": "https://pokeapi.co/api/v2/version/25/"
                  }
              },
              {
                  "rarity": 5,
                  "version": {
                      "name": "alpha-sapphire",
                      "url": "https://pokeapi.co/api/v2/version/26/"
                  }
              },
              {
                  "rarity": 5,
                  "version": {
                      "name": "sun",
                      "url": "https://pokeapi.co/api/v2/version/27/"
                  }
              },
              {
                  "rarity": 5,
                  "version": {
                      "name": "moon",
                      "url": "https://pokeapi.co/api/v2/version/28/"
                  }
              },
              {
                  "rarity": 5,
                  "version": {
                      "name": "ultra-sun",
                      "url": "https://pokeapi.co/api/v2/version/29/"
                  }
              },
              {
                  "rarity": 5,
                  "version": {
                      "name": "ultra-moon",
                      "url": "https://pokeapi.co/api/v2/version/30/"
                  }
              }
          ]
      }
  ],
  "id": 25,
  "is_default": true,
  "location_area_encounters": "https://pokeapi.co/api/v2/pokemon/25/encounters",
  "moves": [
      {
          "move": {
              "name": "mega-punch",
              "url": "https://pokeapi.co/api/v2/move/5/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "red-blue",
                      "url": "https://pokeapi.co/api/v2/version-group/1/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "yellow",
                      "url": "https://pokeapi.co/api/v2/version-group/2/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "emerald",
                      "url": "https://pokeapi.co/api/v2/version-group/6/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "firered-leafgreen",
                      "url": "https://pokeapi.co/api/v2/version-group/7/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "pay-day",
              "url": "https://pokeapi.co/api/v2/move/6/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "red-blue",
                      "url": "https://pokeapi.co/api/v2/version-group/1/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "yellow",
                      "url": "https://pokeapi.co/api/v2/version-group/2/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "thunder-punch",
              "url": "https://pokeapi.co/api/v2/move/9/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "gold-silver",
                      "url": "https://pokeapi.co/api/v2/version-group/3/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "crystal",
                      "url": "https://pokeapi.co/api/v2/version-group/4/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "emerald",
                      "url": "https://pokeapi.co/api/v2/version-group/6/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "platinum",
                      "url": "https://pokeapi.co/api/v2/version-group/9/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "heartgold-soulsilver",
                      "url": "https://pokeapi.co/api/v2/version-group/10/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "black-2-white-2",
                      "url": "https://pokeapi.co/api/v2/version-group/14/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "omega-ruby-alpha-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/16/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "slam",
              "url": "https://pokeapi.co/api/v2/move/21/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 20,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "yellow",
                      "url": "https://pokeapi.co/api/v2/version-group/2/"
                  }
              },
              {
                  "level_learned_at": 20,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "gold-silver",
                      "url": "https://pokeapi.co/api/v2/version-group/3/"
                  }
              },
              {
                  "level_learned_at": 20,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "crystal",
                      "url": "https://pokeapi.co/api/v2/version-group/4/"
                  }
              },
              {
                  "level_learned_at": 20,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "ruby-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/5/"
                  }
              },
              {
                  "level_learned_at": 20,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "emerald",
                      "url": "https://pokeapi.co/api/v2/version-group/6/"
                  }
              },
              {
                  "level_learned_at": 20,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "firered-leafgreen",
                      "url": "https://pokeapi.co/api/v2/version-group/7/"
                  }
              },
              {
                  "level_learned_at": 21,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "diamond-pearl",
                      "url": "https://pokeapi.co/api/v2/version-group/8/"
                  }
              },
              {
                  "level_learned_at": 21,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "platinum",
                      "url": "https://pokeapi.co/api/v2/version-group/9/"
                  }
              },
              {
                  "level_learned_at": 21,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "heartgold-soulsilver",
                      "url": "https://pokeapi.co/api/v2/version-group/10/"
                  }
              },
              {
                  "level_learned_at": 26,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "black-white",
                      "url": "https://pokeapi.co/api/v2/version-group/11/"
                  }
              },
              {
                  "level_learned_at": 20,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "colosseum",
                      "url": "https://pokeapi.co/api/v2/version-group/12/"
                  }
              },
              {
                  "level_learned_at": 20,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "xd",
                      "url": "https://pokeapi.co/api/v2/version-group/13/"
                  }
              },
              {
                  "level_learned_at": 26,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "black-2-white-2",
                      "url": "https://pokeapi.co/api/v2/version-group/14/"
                  }
              },
              {
                  "level_learned_at": 26,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "x-y",
                      "url": "https://pokeapi.co/api/v2/version-group/15/"
                  }
              },
              {
                  "level_learned_at": 37,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "omega-ruby-alpha-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/16/"
                  }
              },
              {
                  "level_learned_at": 37,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "sun-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/17/"
                  }
              },
              {
                  "level_learned_at": 37,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "ultra-sun-ultra-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/18/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "mega-kick",
              "url": "https://pokeapi.co/api/v2/move/25/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "red-blue",
                      "url": "https://pokeapi.co/api/v2/version-group/1/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "yellow",
                      "url": "https://pokeapi.co/api/v2/version-group/2/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "emerald",
                      "url": "https://pokeapi.co/api/v2/version-group/6/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "firered-leafgreen",
                      "url": "https://pokeapi.co/api/v2/version-group/7/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "headbutt",
              "url": "https://pokeapi.co/api/v2/move/29/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "gold-silver",
                      "url": "https://pokeapi.co/api/v2/version-group/3/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "crystal",
                      "url": "https://pokeapi.co/api/v2/version-group/4/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "heartgold-soulsilver",
                      "url": "https://pokeapi.co/api/v2/version-group/10/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "body-slam",
              "url": "https://pokeapi.co/api/v2/move/34/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "red-blue",
                      "url": "https://pokeapi.co/api/v2/version-group/1/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "yellow",
                      "url": "https://pokeapi.co/api/v2/version-group/2/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "emerald",
                      "url": "https://pokeapi.co/api/v2/version-group/6/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "firered-leafgreen",
                      "url": "https://pokeapi.co/api/v2/version-group/7/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "xd",
                      "url": "https://pokeapi.co/api/v2/version-group/13/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "take-down",
              "url": "https://pokeapi.co/api/v2/move/36/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "red-blue",
                      "url": "https://pokeapi.co/api/v2/version-group/1/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "yellow",
                      "url": "https://pokeapi.co/api/v2/version-group/2/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "double-edge",
              "url": "https://pokeapi.co/api/v2/move/38/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "red-blue",
                      "url": "https://pokeapi.co/api/v2/version-group/1/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "yellow",
                      "url": "https://pokeapi.co/api/v2/version-group/2/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "emerald",
                      "url": "https://pokeapi.co/api/v2/version-group/6/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "firered-leafgreen",
                      "url": "https://pokeapi.co/api/v2/version-group/7/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "xd",
                      "url": "https://pokeapi.co/api/v2/version-group/13/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "tail-whip",
              "url": "https://pokeapi.co/api/v2/move/39/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 6,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "yellow",
                      "url": "https://pokeapi.co/api/v2/version-group/2/"
                  }
              },
              {
                  "level_learned_at": 6,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "gold-silver",
                      "url": "https://pokeapi.co/api/v2/version-group/3/"
                  }
              },
              {
                  "level_learned_at": 6,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "crystal",
                      "url": "https://pokeapi.co/api/v2/version-group/4/"
                  }
              },
              {
                  "level_learned_at": 6,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "ruby-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/5/"
                  }
              },
              {
                  "level_learned_at": 6,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "emerald",
                      "url": "https://pokeapi.co/api/v2/version-group/6/"
                  }
              },
              {
                  "level_learned_at": 6,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "firered-leafgreen",
                      "url": "https://pokeapi.co/api/v2/version-group/7/"
                  }
              },
              {
                  "level_learned_at": 5,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "diamond-pearl",
                      "url": "https://pokeapi.co/api/v2/version-group/8/"
                  }
              },
              {
                  "level_learned_at": 5,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "platinum",
                      "url": "https://pokeapi.co/api/v2/version-group/9/"
                  }
              },
              {
                  "level_learned_at": 5,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "heartgold-soulsilver",
                      "url": "https://pokeapi.co/api/v2/version-group/10/"
                  }
              },
              {
                  "level_learned_at": 5,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "black-white",
                      "url": "https://pokeapi.co/api/v2/version-group/11/"
                  }
              },
              {
                  "level_learned_at": 6,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "colosseum",
                      "url": "https://pokeapi.co/api/v2/version-group/12/"
                  }
              },
              {
                  "level_learned_at": 6,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "xd",
                      "url": "https://pokeapi.co/api/v2/version-group/13/"
                  }
              },
              {
                  "level_learned_at": 5,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "black-2-white-2",
                      "url": "https://pokeapi.co/api/v2/version-group/14/"
                  }
              },
              {
                  "level_learned_at": 1,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "x-y",
                      "url": "https://pokeapi.co/api/v2/version-group/15/"
                  }
              },
              {
                  "level_learned_at": 1,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "omega-ruby-alpha-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/16/"
                  }
              },
              {
                  "level_learned_at": 1,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "sun-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/17/"
                  }
              },
              {
                  "level_learned_at": 1,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "ultra-sun-ultra-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/18/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "growl",
              "url": "https://pokeapi.co/api/v2/move/45/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 1,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "red-blue",
                      "url": "https://pokeapi.co/api/v2/version-group/1/"
                  }
              },
              {
                  "level_learned_at": 1,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "yellow",
                      "url": "https://pokeapi.co/api/v2/version-group/2/"
                  }
              },
              {
                  "level_learned_at": 1,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "gold-silver",
                      "url": "https://pokeapi.co/api/v2/version-group/3/"
                  }
              },
              {
                  "level_learned_at": 1,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "crystal",
                      "url": "https://pokeapi.co/api/v2/version-group/4/"
                  }
              },
              {
                  "level_learned_at": 1,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "ruby-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/5/"
                  }
              },
              {
                  "level_learned_at": 1,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "emerald",
                      "url": "https://pokeapi.co/api/v2/version-group/6/"
                  }
              },
              {
                  "level_learned_at": 1,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "firered-leafgreen",
                      "url": "https://pokeapi.co/api/v2/version-group/7/"
                  }
              },
              {
                  "level_learned_at": 1,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "diamond-pearl",
                      "url": "https://pokeapi.co/api/v2/version-group/8/"
                  }
              },
              {
                  "level_learned_at": 1,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "platinum",
                      "url": "https://pokeapi.co/api/v2/version-group/9/"
                  }
              },
              {
                  "level_learned_at": 1,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "heartgold-soulsilver",
                      "url": "https://pokeapi.co/api/v2/version-group/10/"
                  }
              },
              {
                  "level_learned_at": 1,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "black-white",
                      "url": "https://pokeapi.co/api/v2/version-group/11/"
                  }
              },
              {
                  "level_learned_at": 1,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "colosseum",
                      "url": "https://pokeapi.co/api/v2/version-group/12/"
                  }
              },
              {
                  "level_learned_at": 1,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "xd",
                      "url": "https://pokeapi.co/api/v2/version-group/13/"
                  }
              },
              {
                  "level_learned_at": 1,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "black-2-white-2",
                      "url": "https://pokeapi.co/api/v2/version-group/14/"
                  }
              },
              {
                  "level_learned_at": 5,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "x-y",
                      "url": "https://pokeapi.co/api/v2/version-group/15/"
                  }
              },
              {
                  "level_learned_at": 5,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "omega-ruby-alpha-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/16/"
                  }
              },
              {
                  "level_learned_at": 5,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "sun-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/17/"
                  }
              },
              {
                  "level_learned_at": 5,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "ultra-sun-ultra-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/18/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "surf",
              "url": "https://pokeapi.co/api/v2/move/57/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "stadium-surfing-pikachu",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/5/"
                  },
                  "version_group": {
                      "name": "red-blue",
                      "url": "https://pokeapi.co/api/v2/version-group/1/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "stadium-surfing-pikachu",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/5/"
                  },
                  "version_group": {
                      "name": "yellow",
                      "url": "https://pokeapi.co/api/v2/version-group/2/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "submission",
              "url": "https://pokeapi.co/api/v2/move/66/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "red-blue",
                      "url": "https://pokeapi.co/api/v2/version-group/1/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "yellow",
                      "url": "https://pokeapi.co/api/v2/version-group/2/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "counter",
              "url": "https://pokeapi.co/api/v2/move/68/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "emerald",
                      "url": "https://pokeapi.co/api/v2/version-group/6/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "firered-leafgreen",
                      "url": "https://pokeapi.co/api/v2/version-group/7/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "seismic-toss",
              "url": "https://pokeapi.co/api/v2/move/69/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "red-blue",
                      "url": "https://pokeapi.co/api/v2/version-group/1/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "yellow",
                      "url": "https://pokeapi.co/api/v2/version-group/2/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "emerald",
                      "url": "https://pokeapi.co/api/v2/version-group/6/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "firered-leafgreen",
                      "url": "https://pokeapi.co/api/v2/version-group/7/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "xd",
                      "url": "https://pokeapi.co/api/v2/version-group/13/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "strength",
              "url": "https://pokeapi.co/api/v2/move/70/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "gold-silver",
                      "url": "https://pokeapi.co/api/v2/version-group/3/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "crystal",
                      "url": "https://pokeapi.co/api/v2/version-group/4/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "ruby-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/5/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "emerald",
                      "url": "https://pokeapi.co/api/v2/version-group/6/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "firered-leafgreen",
                      "url": "https://pokeapi.co/api/v2/version-group/7/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "diamond-pearl",
                      "url": "https://pokeapi.co/api/v2/version-group/8/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "platinum",
                      "url": "https://pokeapi.co/api/v2/version-group/9/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "heartgold-soulsilver",
                      "url": "https://pokeapi.co/api/v2/version-group/10/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "black-white",
                      "url": "https://pokeapi.co/api/v2/version-group/11/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "colosseum",
                      "url": "https://pokeapi.co/api/v2/version-group/12/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "xd",
                      "url": "https://pokeapi.co/api/v2/version-group/13/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "black-2-white-2",
                      "url": "https://pokeapi.co/api/v2/version-group/14/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "x-y",
                      "url": "https://pokeapi.co/api/v2/version-group/15/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "omega-ruby-alpha-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/16/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "thunder-shock",
              "url": "https://pokeapi.co/api/v2/move/84/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 1,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "red-blue",
                      "url": "https://pokeapi.co/api/v2/version-group/1/"
                  }
              },
              {
                  "level_learned_at": 1,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "yellow",
                      "url": "https://pokeapi.co/api/v2/version-group/2/"
                  }
              },
              {
                  "level_learned_at": 1,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "gold-silver",
                      "url": "https://pokeapi.co/api/v2/version-group/3/"
                  }
              },
              {
                  "level_learned_at": 1,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "crystal",
                      "url": "https://pokeapi.co/api/v2/version-group/4/"
                  }
              },
              {
                  "level_learned_at": 1,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "ruby-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/5/"
                  }
              },
              {
                  "level_learned_at": 1,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "emerald",
                      "url": "https://pokeapi.co/api/v2/version-group/6/"
                  }
              },
              {
                  "level_learned_at": 1,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "firered-leafgreen",
                      "url": "https://pokeapi.co/api/v2/version-group/7/"
                  }
              },
              {
                  "level_learned_at": 1,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "diamond-pearl",
                      "url": "https://pokeapi.co/api/v2/version-group/8/"
                  }
              },
              {
                  "level_learned_at": 1,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "platinum",
                      "url": "https://pokeapi.co/api/v2/version-group/9/"
                  }
              },
              {
                  "level_learned_at": 1,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "heartgold-soulsilver",
                      "url": "https://pokeapi.co/api/v2/version-group/10/"
                  }
              },
              {
                  "level_learned_at": 1,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "black-white",
                      "url": "https://pokeapi.co/api/v2/version-group/11/"
                  }
              },
              {
                  "level_learned_at": 1,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "colosseum",
                      "url": "https://pokeapi.co/api/v2/version-group/12/"
                  }
              },
              {
                  "level_learned_at": 1,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "xd",
                      "url": "https://pokeapi.co/api/v2/version-group/13/"
                  }
              },
              {
                  "level_learned_at": 1,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "black-2-white-2",
                      "url": "https://pokeapi.co/api/v2/version-group/14/"
                  }
              },
              {
                  "level_learned_at": 1,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "x-y",
                      "url": "https://pokeapi.co/api/v2/version-group/15/"
                  }
              },
              {
                  "level_learned_at": 1,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "omega-ruby-alpha-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/16/"
                  }
              },
              {
                  "level_learned_at": 1,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "sun-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/17/"
                  }
              },
              {
                  "level_learned_at": 1,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "ultra-sun-ultra-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/18/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "thunderbolt",
              "url": "https://pokeapi.co/api/v2/move/85/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "red-blue",
                      "url": "https://pokeapi.co/api/v2/version-group/1/"
                  }
              },
              {
                  "level_learned_at": 26,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "yellow",
                      "url": "https://pokeapi.co/api/v2/version-group/2/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "yellow",
                      "url": "https://pokeapi.co/api/v2/version-group/2/"
                  }
              },
              {
                  "level_learned_at": 26,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "gold-silver",
                      "url": "https://pokeapi.co/api/v2/version-group/3/"
                  }
              },
              {
                  "level_learned_at": 26,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "crystal",
                      "url": "https://pokeapi.co/api/v2/version-group/4/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "crystal",
                      "url": "https://pokeapi.co/api/v2/version-group/4/"
                  }
              },
              {
                  "level_learned_at": 26,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "ruby-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/5/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "ruby-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/5/"
                  }
              },
              {
                  "level_learned_at": 26,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "emerald",
                      "url": "https://pokeapi.co/api/v2/version-group/6/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "emerald",
                      "url": "https://pokeapi.co/api/v2/version-group/6/"
                  }
              },
              {
                  "level_learned_at": 26,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "firered-leafgreen",
                      "url": "https://pokeapi.co/api/v2/version-group/7/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "firered-leafgreen",
                      "url": "https://pokeapi.co/api/v2/version-group/7/"
                  }
              },
              {
                  "level_learned_at": 26,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "diamond-pearl",
                      "url": "https://pokeapi.co/api/v2/version-group/8/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "diamond-pearl",
                      "url": "https://pokeapi.co/api/v2/version-group/8/"
                  }
              },
              {
                  "level_learned_at": 26,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "platinum",
                      "url": "https://pokeapi.co/api/v2/version-group/9/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "platinum",
                      "url": "https://pokeapi.co/api/v2/version-group/9/"
                  }
              },
              {
                  "level_learned_at": 26,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "heartgold-soulsilver",
                      "url": "https://pokeapi.co/api/v2/version-group/10/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "heartgold-soulsilver",
                      "url": "https://pokeapi.co/api/v2/version-group/10/"
                  }
              },
              {
                  "level_learned_at": 29,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "black-white",
                      "url": "https://pokeapi.co/api/v2/version-group/11/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "black-white",
                      "url": "https://pokeapi.co/api/v2/version-group/11/"
                  }
              },
              {
                  "level_learned_at": 26,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "colosseum",
                      "url": "https://pokeapi.co/api/v2/version-group/12/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "colosseum",
                      "url": "https://pokeapi.co/api/v2/version-group/12/"
                  }
              },
              {
                  "level_learned_at": 26,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "xd",
                      "url": "https://pokeapi.co/api/v2/version-group/13/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "xd",
                      "url": "https://pokeapi.co/api/v2/version-group/13/"
                  }
              },
              {
                  "level_learned_at": 29,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "black-2-white-2",
                      "url": "https://pokeapi.co/api/v2/version-group/14/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "black-2-white-2",
                      "url": "https://pokeapi.co/api/v2/version-group/14/"
                  }
              },
              {
                  "level_learned_at": 29,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "x-y",
                      "url": "https://pokeapi.co/api/v2/version-group/15/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "x-y",
                      "url": "https://pokeapi.co/api/v2/version-group/15/"
                  }
              },
              {
                  "level_learned_at": 42,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "omega-ruby-alpha-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/16/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "omega-ruby-alpha-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/16/"
                  }
              },
              {
                  "level_learned_at": 42,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "sun-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/17/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "sun-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/17/"
                  }
              },
              {
                  "level_learned_at": 42,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "ultra-sun-ultra-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/18/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "ultra-sun-ultra-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/18/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "thunder-wave",
              "url": "https://pokeapi.co/api/v2/move/86/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 9,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "red-blue",
                      "url": "https://pokeapi.co/api/v2/version-group/1/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "red-blue",
                      "url": "https://pokeapi.co/api/v2/version-group/1/"
                  }
              },
              {
                  "level_learned_at": 8,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "yellow",
                      "url": "https://pokeapi.co/api/v2/version-group/2/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "yellow",
                      "url": "https://pokeapi.co/api/v2/version-group/2/"
                  }
              },
              {
                  "level_learned_at": 8,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "gold-silver",
                      "url": "https://pokeapi.co/api/v2/version-group/3/"
                  }
              },
              {
                  "level_learned_at": 8,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "crystal",
                      "url": "https://pokeapi.co/api/v2/version-group/4/"
                  }
              },
              {
                  "level_learned_at": 8,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "ruby-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/5/"
                  }
              },
              {
                  "level_learned_at": 8,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "emerald",
                      "url": "https://pokeapi.co/api/v2/version-group/6/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "emerald",
                      "url": "https://pokeapi.co/api/v2/version-group/6/"
                  }
              },
              {
                  "level_learned_at": 8,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "firered-leafgreen",
                      "url": "https://pokeapi.co/api/v2/version-group/7/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "firered-leafgreen",
                      "url": "https://pokeapi.co/api/v2/version-group/7/"
                  }
              },
              {
                  "level_learned_at": 10,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "diamond-pearl",
                      "url": "https://pokeapi.co/api/v2/version-group/8/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "diamond-pearl",
                      "url": "https://pokeapi.co/api/v2/version-group/8/"
                  }
              },
              {
                  "level_learned_at": 10,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "platinum",
                      "url": "https://pokeapi.co/api/v2/version-group/9/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "platinum",
                      "url": "https://pokeapi.co/api/v2/version-group/9/"
                  }
              },
              {
                  "level_learned_at": 10,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "heartgold-soulsilver",
                      "url": "https://pokeapi.co/api/v2/version-group/10/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "heartgold-soulsilver",
                      "url": "https://pokeapi.co/api/v2/version-group/10/"
                  }
              },
              {
                  "level_learned_at": 10,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "black-white",
                      "url": "https://pokeapi.co/api/v2/version-group/11/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "black-white",
                      "url": "https://pokeapi.co/api/v2/version-group/11/"
                  }
              },
              {
                  "level_learned_at": 8,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "colosseum",
                      "url": "https://pokeapi.co/api/v2/version-group/12/"
                  }
              },
              {
                  "level_learned_at": 8,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "xd",
                      "url": "https://pokeapi.co/api/v2/version-group/13/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "xd",
                      "url": "https://pokeapi.co/api/v2/version-group/13/"
                  }
              },
              {
                  "level_learned_at": 10,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "black-2-white-2",
                      "url": "https://pokeapi.co/api/v2/version-group/14/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "black-2-white-2",
                      "url": "https://pokeapi.co/api/v2/version-group/14/"
                  }
              },
              {
                  "level_learned_at": 13,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "x-y",
                      "url": "https://pokeapi.co/api/v2/version-group/15/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "x-y",
                      "url": "https://pokeapi.co/api/v2/version-group/15/"
                  }
              },
              {
                  "level_learned_at": 18,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "omega-ruby-alpha-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/16/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "omega-ruby-alpha-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/16/"
                  }
              },
              {
                  "level_learned_at": 18,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "sun-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/17/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "sun-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/17/"
                  }
              },
              {
                  "level_learned_at": 18,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "ultra-sun-ultra-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/18/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "ultra-sun-ultra-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/18/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "thunder",
              "url": "https://pokeapi.co/api/v2/move/87/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 43,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "red-blue",
                      "url": "https://pokeapi.co/api/v2/version-group/1/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "red-blue",
                      "url": "https://pokeapi.co/api/v2/version-group/1/"
                  }
              },
              {
                  "level_learned_at": 41,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "yellow",
                      "url": "https://pokeapi.co/api/v2/version-group/2/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "yellow",
                      "url": "https://pokeapi.co/api/v2/version-group/2/"
                  }
              },
              {
                  "level_learned_at": 41,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "gold-silver",
                      "url": "https://pokeapi.co/api/v2/version-group/3/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "gold-silver",
                      "url": "https://pokeapi.co/api/v2/version-group/3/"
                  }
              },
              {
                  "level_learned_at": 41,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "crystal",
                      "url": "https://pokeapi.co/api/v2/version-group/4/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "crystal",
                      "url": "https://pokeapi.co/api/v2/version-group/4/"
                  }
              },
              {
                  "level_learned_at": 41,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "ruby-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/5/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "ruby-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/5/"
                  }
              },
              {
                  "level_learned_at": 41,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "emerald",
                      "url": "https://pokeapi.co/api/v2/version-group/6/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "emerald",
                      "url": "https://pokeapi.co/api/v2/version-group/6/"
                  }
              },
              {
                  "level_learned_at": 41,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "firered-leafgreen",
                      "url": "https://pokeapi.co/api/v2/version-group/7/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "firered-leafgreen",
                      "url": "https://pokeapi.co/api/v2/version-group/7/"
                  }
              },
              {
                  "level_learned_at": 45,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "diamond-pearl",
                      "url": "https://pokeapi.co/api/v2/version-group/8/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "diamond-pearl",
                      "url": "https://pokeapi.co/api/v2/version-group/8/"
                  }
              },
              {
                  "level_learned_at": 45,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "platinum",
                      "url": "https://pokeapi.co/api/v2/version-group/9/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "platinum",
                      "url": "https://pokeapi.co/api/v2/version-group/9/"
                  }
              },
              {
                  "level_learned_at": 45,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "heartgold-soulsilver",
                      "url": "https://pokeapi.co/api/v2/version-group/10/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "heartgold-soulsilver",
                      "url": "https://pokeapi.co/api/v2/version-group/10/"
                  }
              },
              {
                  "level_learned_at": 50,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "black-white",
                      "url": "https://pokeapi.co/api/v2/version-group/11/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "black-white",
                      "url": "https://pokeapi.co/api/v2/version-group/11/"
                  }
              },
              {
                  "level_learned_at": 41,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "colosseum",
                      "url": "https://pokeapi.co/api/v2/version-group/12/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "colosseum",
                      "url": "https://pokeapi.co/api/v2/version-group/12/"
                  }
              },
              {
                  "level_learned_at": 41,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "xd",
                      "url": "https://pokeapi.co/api/v2/version-group/13/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "xd",
                      "url": "https://pokeapi.co/api/v2/version-group/13/"
                  }
              },
              {
                  "level_learned_at": 50,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "black-2-white-2",
                      "url": "https://pokeapi.co/api/v2/version-group/14/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "black-2-white-2",
                      "url": "https://pokeapi.co/api/v2/version-group/14/"
                  }
              },
              {
                  "level_learned_at": 50,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "x-y",
                      "url": "https://pokeapi.co/api/v2/version-group/15/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "x-y",
                      "url": "https://pokeapi.co/api/v2/version-group/15/"
                  }
              },
              {
                  "level_learned_at": 58,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "omega-ruby-alpha-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/16/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "omega-ruby-alpha-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/16/"
                  }
              },
              {
                  "level_learned_at": 58,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "sun-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/17/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "sun-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/17/"
                  }
              },
              {
                  "level_learned_at": 58,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "ultra-sun-ultra-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/18/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "ultra-sun-ultra-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/18/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "dig",
              "url": "https://pokeapi.co/api/v2/move/91/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "ruby-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/5/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "emerald",
                      "url": "https://pokeapi.co/api/v2/version-group/6/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "firered-leafgreen",
                      "url": "https://pokeapi.co/api/v2/version-group/7/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "diamond-pearl",
                      "url": "https://pokeapi.co/api/v2/version-group/8/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "platinum",
                      "url": "https://pokeapi.co/api/v2/version-group/9/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "heartgold-soulsilver",
                      "url": "https://pokeapi.co/api/v2/version-group/10/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "black-white",
                      "url": "https://pokeapi.co/api/v2/version-group/11/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "colosseum",
                      "url": "https://pokeapi.co/api/v2/version-group/12/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "xd",
                      "url": "https://pokeapi.co/api/v2/version-group/13/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "black-2-white-2",
                      "url": "https://pokeapi.co/api/v2/version-group/14/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "x-y",
                      "url": "https://pokeapi.co/api/v2/version-group/15/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "omega-ruby-alpha-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/16/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "toxic",
              "url": "https://pokeapi.co/api/v2/move/92/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "red-blue",
                      "url": "https://pokeapi.co/api/v2/version-group/1/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "yellow",
                      "url": "https://pokeapi.co/api/v2/version-group/2/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "gold-silver",
                      "url": "https://pokeapi.co/api/v2/version-group/3/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "crystal",
                      "url": "https://pokeapi.co/api/v2/version-group/4/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "ruby-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/5/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "emerald",
                      "url": "https://pokeapi.co/api/v2/version-group/6/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "firered-leafgreen",
                      "url": "https://pokeapi.co/api/v2/version-group/7/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "diamond-pearl",
                      "url": "https://pokeapi.co/api/v2/version-group/8/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "platinum",
                      "url": "https://pokeapi.co/api/v2/version-group/9/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "heartgold-soulsilver",
                      "url": "https://pokeapi.co/api/v2/version-group/10/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "black-white",
                      "url": "https://pokeapi.co/api/v2/version-group/11/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "colosseum",
                      "url": "https://pokeapi.co/api/v2/version-group/12/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "xd",
                      "url": "https://pokeapi.co/api/v2/version-group/13/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "black-2-white-2",
                      "url": "https://pokeapi.co/api/v2/version-group/14/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "x-y",
                      "url": "https://pokeapi.co/api/v2/version-group/15/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "omega-ruby-alpha-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/16/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "sun-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/17/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "ultra-sun-ultra-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/18/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "agility",
              "url": "https://pokeapi.co/api/v2/move/97/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 33,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "red-blue",
                      "url": "https://pokeapi.co/api/v2/version-group/1/"
                  }
              },
              {
                  "level_learned_at": 33,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "yellow",
                      "url": "https://pokeapi.co/api/v2/version-group/2/"
                  }
              },
              {
                  "level_learned_at": 33,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "gold-silver",
                      "url": "https://pokeapi.co/api/v2/version-group/3/"
                  }
              },
              {
                  "level_learned_at": 33,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "crystal",
                      "url": "https://pokeapi.co/api/v2/version-group/4/"
                  }
              },
              {
                  "level_learned_at": 33,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "ruby-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/5/"
                  }
              },
              {
                  "level_learned_at": 33,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "emerald",
                      "url": "https://pokeapi.co/api/v2/version-group/6/"
                  }
              },
              {
                  "level_learned_at": 33,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "firered-leafgreen",
                      "url": "https://pokeapi.co/api/v2/version-group/7/"
                  }
              },
              {
                  "level_learned_at": 34,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "diamond-pearl",
                      "url": "https://pokeapi.co/api/v2/version-group/8/"
                  }
              },
              {
                  "level_learned_at": 34,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "platinum",
                      "url": "https://pokeapi.co/api/v2/version-group/9/"
                  }
              },
              {
                  "level_learned_at": 34,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "heartgold-soulsilver",
                      "url": "https://pokeapi.co/api/v2/version-group/10/"
                  }
              },
              {
                  "level_learned_at": 37,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "black-white",
                      "url": "https://pokeapi.co/api/v2/version-group/11/"
                  }
              },
              {
                  "level_learned_at": 33,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "colosseum",
                      "url": "https://pokeapi.co/api/v2/version-group/12/"
                  }
              },
              {
                  "level_learned_at": 33,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "xd",
                      "url": "https://pokeapi.co/api/v2/version-group/13/"
                  }
              },
              {
                  "level_learned_at": 37,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "black-2-white-2",
                      "url": "https://pokeapi.co/api/v2/version-group/14/"
                  }
              },
              {
                  "level_learned_at": 37,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "x-y",
                      "url": "https://pokeapi.co/api/v2/version-group/15/"
                  }
              },
              {
                  "level_learned_at": 45,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "omega-ruby-alpha-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/16/"
                  }
              },
              {
                  "level_learned_at": 45,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "sun-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/17/"
                  }
              },
              {
                  "level_learned_at": 45,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "ultra-sun-ultra-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/18/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "quick-attack",
              "url": "https://pokeapi.co/api/v2/move/98/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 16,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "red-blue",
                      "url": "https://pokeapi.co/api/v2/version-group/1/"
                  }
              },
              {
                  "level_learned_at": 11,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "yellow",
                      "url": "https://pokeapi.co/api/v2/version-group/2/"
                  }
              },
              {
                  "level_learned_at": 11,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "gold-silver",
                      "url": "https://pokeapi.co/api/v2/version-group/3/"
                  }
              },
              {
                  "level_learned_at": 11,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "crystal",
                      "url": "https://pokeapi.co/api/v2/version-group/4/"
                  }
              },
              {
                  "level_learned_at": 11,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "ruby-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/5/"
                  }
              },
              {
                  "level_learned_at": 11,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "emerald",
                      "url": "https://pokeapi.co/api/v2/version-group/6/"
                  }
              },
              {
                  "level_learned_at": 11,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "firered-leafgreen",
                      "url": "https://pokeapi.co/api/v2/version-group/7/"
                  }
              },
              {
                  "level_learned_at": 13,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "diamond-pearl",
                      "url": "https://pokeapi.co/api/v2/version-group/8/"
                  }
              },
              {
                  "level_learned_at": 13,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "platinum",
                      "url": "https://pokeapi.co/api/v2/version-group/9/"
                  }
              },
              {
                  "level_learned_at": 13,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "heartgold-soulsilver",
                      "url": "https://pokeapi.co/api/v2/version-group/10/"
                  }
              },
              {
                  "level_learned_at": 13,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "black-white",
                      "url": "https://pokeapi.co/api/v2/version-group/11/"
                  }
              },
              {
                  "level_learned_at": 11,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "colosseum",
                      "url": "https://pokeapi.co/api/v2/version-group/12/"
                  }
              },
              {
                  "level_learned_at": 11,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "xd",
                      "url": "https://pokeapi.co/api/v2/version-group/13/"
                  }
              },
              {
                  "level_learned_at": 13,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "black-2-white-2",
                      "url": "https://pokeapi.co/api/v2/version-group/14/"
                  }
              },
              {
                  "level_learned_at": 10,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "x-y",
                      "url": "https://pokeapi.co/api/v2/version-group/15/"
                  }
              },
              {
                  "level_learned_at": 10,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "omega-ruby-alpha-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/16/"
                  }
              },
              {
                  "level_learned_at": 10,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "sun-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/17/"
                  }
              },
              {
                  "level_learned_at": 10,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "ultra-sun-ultra-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/18/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "rage",
              "url": "https://pokeapi.co/api/v2/move/99/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "red-blue",
                      "url": "https://pokeapi.co/api/v2/version-group/1/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "yellow",
                      "url": "https://pokeapi.co/api/v2/version-group/2/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "mimic",
              "url": "https://pokeapi.co/api/v2/move/102/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "red-blue",
                      "url": "https://pokeapi.co/api/v2/version-group/1/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "yellow",
                      "url": "https://pokeapi.co/api/v2/version-group/2/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "emerald",
                      "url": "https://pokeapi.co/api/v2/version-group/6/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "firered-leafgreen",
                      "url": "https://pokeapi.co/api/v2/version-group/7/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "xd",
                      "url": "https://pokeapi.co/api/v2/version-group/13/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "double-team",
              "url": "https://pokeapi.co/api/v2/move/104/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "red-blue",
                      "url": "https://pokeapi.co/api/v2/version-group/1/"
                  }
              },
              {
                  "level_learned_at": 15,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "yellow",
                      "url": "https://pokeapi.co/api/v2/version-group/2/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "yellow",
                      "url": "https://pokeapi.co/api/v2/version-group/2/"
                  }
              },
              {
                  "level_learned_at": 15,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "gold-silver",
                      "url": "https://pokeapi.co/api/v2/version-group/3/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "gold-silver",
                      "url": "https://pokeapi.co/api/v2/version-group/3/"
                  }
              },
              {
                  "level_learned_at": 15,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "crystal",
                      "url": "https://pokeapi.co/api/v2/version-group/4/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "crystal",
                      "url": "https://pokeapi.co/api/v2/version-group/4/"
                  }
              },
              {
                  "level_learned_at": 15,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "ruby-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/5/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "ruby-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/5/"
                  }
              },
              {
                  "level_learned_at": 15,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "emerald",
                      "url": "https://pokeapi.co/api/v2/version-group/6/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "emerald",
                      "url": "https://pokeapi.co/api/v2/version-group/6/"
                  }
              },
              {
                  "level_learned_at": 15,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "firered-leafgreen",
                      "url": "https://pokeapi.co/api/v2/version-group/7/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "firered-leafgreen",
                      "url": "https://pokeapi.co/api/v2/version-group/7/"
                  }
              },
              {
                  "level_learned_at": 18,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "diamond-pearl",
                      "url": "https://pokeapi.co/api/v2/version-group/8/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "diamond-pearl",
                      "url": "https://pokeapi.co/api/v2/version-group/8/"
                  }
              },
              {
                  "level_learned_at": 18,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "platinum",
                      "url": "https://pokeapi.co/api/v2/version-group/9/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "platinum",
                      "url": "https://pokeapi.co/api/v2/version-group/9/"
                  }
              },
              {
                  "level_learned_at": 18,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "heartgold-soulsilver",
                      "url": "https://pokeapi.co/api/v2/version-group/10/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "heartgold-soulsilver",
                      "url": "https://pokeapi.co/api/v2/version-group/10/"
                  }
              },
              {
                  "level_learned_at": 21,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "black-white",
                      "url": "https://pokeapi.co/api/v2/version-group/11/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "black-white",
                      "url": "https://pokeapi.co/api/v2/version-group/11/"
                  }
              },
              {
                  "level_learned_at": 15,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "colosseum",
                      "url": "https://pokeapi.co/api/v2/version-group/12/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "colosseum",
                      "url": "https://pokeapi.co/api/v2/version-group/12/"
                  }
              },
              {
                  "level_learned_at": 15,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "xd",
                      "url": "https://pokeapi.co/api/v2/version-group/13/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "xd",
                      "url": "https://pokeapi.co/api/v2/version-group/13/"
                  }
              },
              {
                  "level_learned_at": 21,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "black-2-white-2",
                      "url": "https://pokeapi.co/api/v2/version-group/14/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "black-2-white-2",
                      "url": "https://pokeapi.co/api/v2/version-group/14/"
                  }
              },
              {
                  "level_learned_at": 21,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "x-y",
                      "url": "https://pokeapi.co/api/v2/version-group/15/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "x-y",
                      "url": "https://pokeapi.co/api/v2/version-group/15/"
                  }
              },
              {
                  "level_learned_at": 23,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "omega-ruby-alpha-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/16/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "omega-ruby-alpha-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/16/"
                  }
              },
              {
                  "level_learned_at": 23,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "sun-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/17/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "sun-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/17/"
                  }
              },
              {
                  "level_learned_at": 23,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "ultra-sun-ultra-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/18/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "ultra-sun-ultra-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/18/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "defense-curl",
              "url": "https://pokeapi.co/api/v2/move/111/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "gold-silver",
                      "url": "https://pokeapi.co/api/v2/version-group/3/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "crystal",
                      "url": "https://pokeapi.co/api/v2/version-group/4/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "emerald",
                      "url": "https://pokeapi.co/api/v2/version-group/6/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "light-screen",
              "url": "https://pokeapi.co/api/v2/move/113/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 50,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "yellow",
                      "url": "https://pokeapi.co/api/v2/version-group/2/"
                  }
              },
              {
                  "level_learned_at": 50,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "gold-silver",
                      "url": "https://pokeapi.co/api/v2/version-group/3/"
                  }
              },
              {
                  "level_learned_at": 50,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "crystal",
                      "url": "https://pokeapi.co/api/v2/version-group/4/"
                  }
              },
              {
                  "level_learned_at": 50,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "ruby-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/5/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "ruby-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/5/"
                  }
              },
              {
                  "level_learned_at": 50,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "emerald",
                      "url": "https://pokeapi.co/api/v2/version-group/6/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "emerald",
                      "url": "https://pokeapi.co/api/v2/version-group/6/"
                  }
              },
              {
                  "level_learned_at": 50,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "firered-leafgreen",
                      "url": "https://pokeapi.co/api/v2/version-group/7/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "firered-leafgreen",
                      "url": "https://pokeapi.co/api/v2/version-group/7/"
                  }
              },
              {
                  "level_learned_at": 42,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "diamond-pearl",
                      "url": "https://pokeapi.co/api/v2/version-group/8/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "diamond-pearl",
                      "url": "https://pokeapi.co/api/v2/version-group/8/"
                  }
              },
              {
                  "level_learned_at": 42,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "platinum",
                      "url": "https://pokeapi.co/api/v2/version-group/9/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "platinum",
                      "url": "https://pokeapi.co/api/v2/version-group/9/"
                  }
              },
              {
                  "level_learned_at": 42,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "heartgold-soulsilver",
                      "url": "https://pokeapi.co/api/v2/version-group/10/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "heartgold-soulsilver",
                      "url": "https://pokeapi.co/api/v2/version-group/10/"
                  }
              },
              {
                  "level_learned_at": 45,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "black-white",
                      "url": "https://pokeapi.co/api/v2/version-group/11/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "black-white",
                      "url": "https://pokeapi.co/api/v2/version-group/11/"
                  }
              },
              {
                  "level_learned_at": 50,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "colosseum",
                      "url": "https://pokeapi.co/api/v2/version-group/12/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "colosseum",
                      "url": "https://pokeapi.co/api/v2/version-group/12/"
                  }
              },
              {
                  "level_learned_at": 50,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "xd",
                      "url": "https://pokeapi.co/api/v2/version-group/13/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "xd",
                      "url": "https://pokeapi.co/api/v2/version-group/13/"
                  }
              },
              {
                  "level_learned_at": 45,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "black-2-white-2",
                      "url": "https://pokeapi.co/api/v2/version-group/14/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "black-2-white-2",
                      "url": "https://pokeapi.co/api/v2/version-group/14/"
                  }
              },
              {
                  "level_learned_at": 45,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "x-y",
                      "url": "https://pokeapi.co/api/v2/version-group/15/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "x-y",
                      "url": "https://pokeapi.co/api/v2/version-group/15/"
                  }
              },
              {
                  "level_learned_at": 53,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "omega-ruby-alpha-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/16/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "omega-ruby-alpha-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/16/"
                  }
              },
              {
                  "level_learned_at": 53,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "sun-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/17/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "sun-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/17/"
                  }
              },
              {
                  "level_learned_at": 53,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "ultra-sun-ultra-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/18/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "ultra-sun-ultra-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/18/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "reflect",
              "url": "https://pokeapi.co/api/v2/move/115/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "red-blue",
                      "url": "https://pokeapi.co/api/v2/version-group/1/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "yellow",
                      "url": "https://pokeapi.co/api/v2/version-group/2/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "bide",
              "url": "https://pokeapi.co/api/v2/move/117/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "red-blue",
                      "url": "https://pokeapi.co/api/v2/version-group/1/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "yellow",
                      "url": "https://pokeapi.co/api/v2/version-group/2/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "swift",
              "url": "https://pokeapi.co/api/v2/move/129/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 26,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "red-blue",
                      "url": "https://pokeapi.co/api/v2/version-group/1/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "red-blue",
                      "url": "https://pokeapi.co/api/v2/version-group/1/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "yellow",
                      "url": "https://pokeapi.co/api/v2/version-group/2/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "gold-silver",
                      "url": "https://pokeapi.co/api/v2/version-group/3/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "crystal",
                      "url": "https://pokeapi.co/api/v2/version-group/4/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "emerald",
                      "url": "https://pokeapi.co/api/v2/version-group/6/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "platinum",
                      "url": "https://pokeapi.co/api/v2/version-group/9/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "heartgold-soulsilver",
                      "url": "https://pokeapi.co/api/v2/version-group/10/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "skull-bash",
              "url": "https://pokeapi.co/api/v2/move/130/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "red-blue",
                      "url": "https://pokeapi.co/api/v2/version-group/1/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "yellow",
                      "url": "https://pokeapi.co/api/v2/version-group/2/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "flash",
              "url": "https://pokeapi.co/api/v2/move/148/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "red-blue",
                      "url": "https://pokeapi.co/api/v2/version-group/1/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "yellow",
                      "url": "https://pokeapi.co/api/v2/version-group/2/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "gold-silver",
                      "url": "https://pokeapi.co/api/v2/version-group/3/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "crystal",
                      "url": "https://pokeapi.co/api/v2/version-group/4/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "ruby-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/5/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "emerald",
                      "url": "https://pokeapi.co/api/v2/version-group/6/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "firered-leafgreen",
                      "url": "https://pokeapi.co/api/v2/version-group/7/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "diamond-pearl",
                      "url": "https://pokeapi.co/api/v2/version-group/8/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "platinum",
                      "url": "https://pokeapi.co/api/v2/version-group/9/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "heartgold-soulsilver",
                      "url": "https://pokeapi.co/api/v2/version-group/10/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "black-white",
                      "url": "https://pokeapi.co/api/v2/version-group/11/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "colosseum",
                      "url": "https://pokeapi.co/api/v2/version-group/12/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "xd",
                      "url": "https://pokeapi.co/api/v2/version-group/13/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "black-2-white-2",
                      "url": "https://pokeapi.co/api/v2/version-group/14/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "x-y",
                      "url": "https://pokeapi.co/api/v2/version-group/15/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "omega-ruby-alpha-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/16/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "rest",
              "url": "https://pokeapi.co/api/v2/move/156/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "red-blue",
                      "url": "https://pokeapi.co/api/v2/version-group/1/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "yellow",
                      "url": "https://pokeapi.co/api/v2/version-group/2/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "gold-silver",
                      "url": "https://pokeapi.co/api/v2/version-group/3/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "crystal",
                      "url": "https://pokeapi.co/api/v2/version-group/4/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "ruby-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/5/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "emerald",
                      "url": "https://pokeapi.co/api/v2/version-group/6/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "firered-leafgreen",
                      "url": "https://pokeapi.co/api/v2/version-group/7/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "diamond-pearl",
                      "url": "https://pokeapi.co/api/v2/version-group/8/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "platinum",
                      "url": "https://pokeapi.co/api/v2/version-group/9/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "heartgold-soulsilver",
                      "url": "https://pokeapi.co/api/v2/version-group/10/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "black-white",
                      "url": "https://pokeapi.co/api/v2/version-group/11/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "colosseum",
                      "url": "https://pokeapi.co/api/v2/version-group/12/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "xd",
                      "url": "https://pokeapi.co/api/v2/version-group/13/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "black-2-white-2",
                      "url": "https://pokeapi.co/api/v2/version-group/14/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "x-y",
                      "url": "https://pokeapi.co/api/v2/version-group/15/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "omega-ruby-alpha-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/16/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "sun-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/17/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "ultra-sun-ultra-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/18/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "substitute",
              "url": "https://pokeapi.co/api/v2/move/164/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "red-blue",
                      "url": "https://pokeapi.co/api/v2/version-group/1/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "yellow",
                      "url": "https://pokeapi.co/api/v2/version-group/2/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "emerald",
                      "url": "https://pokeapi.co/api/v2/version-group/6/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "firered-leafgreen",
                      "url": "https://pokeapi.co/api/v2/version-group/7/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "diamond-pearl",
                      "url": "https://pokeapi.co/api/v2/version-group/8/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "platinum",
                      "url": "https://pokeapi.co/api/v2/version-group/9/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "heartgold-soulsilver",
                      "url": "https://pokeapi.co/api/v2/version-group/10/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "black-white",
                      "url": "https://pokeapi.co/api/v2/version-group/11/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "xd",
                      "url": "https://pokeapi.co/api/v2/version-group/13/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "black-2-white-2",
                      "url": "https://pokeapi.co/api/v2/version-group/14/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "x-y",
                      "url": "https://pokeapi.co/api/v2/version-group/15/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "omega-ruby-alpha-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/16/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "sun-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/17/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "ultra-sun-ultra-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/18/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "snore",
              "url": "https://pokeapi.co/api/v2/move/173/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "gold-silver",
                      "url": "https://pokeapi.co/api/v2/version-group/3/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "crystal",
                      "url": "https://pokeapi.co/api/v2/version-group/4/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "emerald",
                      "url": "https://pokeapi.co/api/v2/version-group/6/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "platinum",
                      "url": "https://pokeapi.co/api/v2/version-group/9/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "heartgold-soulsilver",
                      "url": "https://pokeapi.co/api/v2/version-group/10/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "black-2-white-2",
                      "url": "https://pokeapi.co/api/v2/version-group/14/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "omega-ruby-alpha-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/16/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "curse",
              "url": "https://pokeapi.co/api/v2/move/174/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "gold-silver",
                      "url": "https://pokeapi.co/api/v2/version-group/3/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "crystal",
                      "url": "https://pokeapi.co/api/v2/version-group/4/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "protect",
              "url": "https://pokeapi.co/api/v2/move/182/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "gold-silver",
                      "url": "https://pokeapi.co/api/v2/version-group/3/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "crystal",
                      "url": "https://pokeapi.co/api/v2/version-group/4/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "ruby-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/5/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "emerald",
                      "url": "https://pokeapi.co/api/v2/version-group/6/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "firered-leafgreen",
                      "url": "https://pokeapi.co/api/v2/version-group/7/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "diamond-pearl",
                      "url": "https://pokeapi.co/api/v2/version-group/8/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "platinum",
                      "url": "https://pokeapi.co/api/v2/version-group/9/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "heartgold-soulsilver",
                      "url": "https://pokeapi.co/api/v2/version-group/10/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "black-white",
                      "url": "https://pokeapi.co/api/v2/version-group/11/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "colosseum",
                      "url": "https://pokeapi.co/api/v2/version-group/12/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "xd",
                      "url": "https://pokeapi.co/api/v2/version-group/13/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "black-2-white-2",
                      "url": "https://pokeapi.co/api/v2/version-group/14/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "x-y",
                      "url": "https://pokeapi.co/api/v2/version-group/15/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "omega-ruby-alpha-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/16/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "sun-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/17/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "ultra-sun-ultra-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/18/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "mud-slap",
              "url": "https://pokeapi.co/api/v2/move/189/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "gold-silver",
                      "url": "https://pokeapi.co/api/v2/version-group/3/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "crystal",
                      "url": "https://pokeapi.co/api/v2/version-group/4/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "emerald",
                      "url": "https://pokeapi.co/api/v2/version-group/6/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "platinum",
                      "url": "https://pokeapi.co/api/v2/version-group/9/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "heartgold-soulsilver",
                      "url": "https://pokeapi.co/api/v2/version-group/10/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "zap-cannon",
              "url": "https://pokeapi.co/api/v2/move/192/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "gold-silver",
                      "url": "https://pokeapi.co/api/v2/version-group/3/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "crystal",
                      "url": "https://pokeapi.co/api/v2/version-group/4/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "detect",
              "url": "https://pokeapi.co/api/v2/move/197/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "gold-silver",
                      "url": "https://pokeapi.co/api/v2/version-group/3/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "crystal",
                      "url": "https://pokeapi.co/api/v2/version-group/4/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "endure",
              "url": "https://pokeapi.co/api/v2/move/203/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "gold-silver",
                      "url": "https://pokeapi.co/api/v2/version-group/3/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "crystal",
                      "url": "https://pokeapi.co/api/v2/version-group/4/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "emerald",
                      "url": "https://pokeapi.co/api/v2/version-group/6/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "diamond-pearl",
                      "url": "https://pokeapi.co/api/v2/version-group/8/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "platinum",
                      "url": "https://pokeapi.co/api/v2/version-group/9/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "heartgold-soulsilver",
                      "url": "https://pokeapi.co/api/v2/version-group/10/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "rollout",
              "url": "https://pokeapi.co/api/v2/move/205/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "gold-silver",
                      "url": "https://pokeapi.co/api/v2/version-group/3/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "crystal",
                      "url": "https://pokeapi.co/api/v2/version-group/4/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "emerald",
                      "url": "https://pokeapi.co/api/v2/version-group/6/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "platinum",
                      "url": "https://pokeapi.co/api/v2/version-group/9/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "heartgold-soulsilver",
                      "url": "https://pokeapi.co/api/v2/version-group/10/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "swagger",
              "url": "https://pokeapi.co/api/v2/move/207/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "gold-silver",
                      "url": "https://pokeapi.co/api/v2/version-group/3/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "crystal",
                      "url": "https://pokeapi.co/api/v2/version-group/4/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "emerald",
                      "url": "https://pokeapi.co/api/v2/version-group/6/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "diamond-pearl",
                      "url": "https://pokeapi.co/api/v2/version-group/8/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "platinum",
                      "url": "https://pokeapi.co/api/v2/version-group/9/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "heartgold-soulsilver",
                      "url": "https://pokeapi.co/api/v2/version-group/10/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "black-white",
                      "url": "https://pokeapi.co/api/v2/version-group/11/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "xd",
                      "url": "https://pokeapi.co/api/v2/version-group/13/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "black-2-white-2",
                      "url": "https://pokeapi.co/api/v2/version-group/14/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "x-y",
                      "url": "https://pokeapi.co/api/v2/version-group/15/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "omega-ruby-alpha-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/16/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "sun-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/17/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "ultra-sun-ultra-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/18/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "spark",
              "url": "https://pokeapi.co/api/v2/move/209/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 26,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "omega-ruby-alpha-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/16/"
                  }
              },
              {
                  "level_learned_at": 26,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "sun-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/17/"
                  }
              },
              {
                  "level_learned_at": 26,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "ultra-sun-ultra-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/18/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "attract",
              "url": "https://pokeapi.co/api/v2/move/213/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "gold-silver",
                      "url": "https://pokeapi.co/api/v2/version-group/3/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "crystal",
                      "url": "https://pokeapi.co/api/v2/version-group/4/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "ruby-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/5/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "emerald",
                      "url": "https://pokeapi.co/api/v2/version-group/6/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "firered-leafgreen",
                      "url": "https://pokeapi.co/api/v2/version-group/7/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "diamond-pearl",
                      "url": "https://pokeapi.co/api/v2/version-group/8/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "platinum",
                      "url": "https://pokeapi.co/api/v2/version-group/9/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "heartgold-soulsilver",
                      "url": "https://pokeapi.co/api/v2/version-group/10/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "black-white",
                      "url": "https://pokeapi.co/api/v2/version-group/11/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "colosseum",
                      "url": "https://pokeapi.co/api/v2/version-group/12/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "xd",
                      "url": "https://pokeapi.co/api/v2/version-group/13/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "black-2-white-2",
                      "url": "https://pokeapi.co/api/v2/version-group/14/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "x-y",
                      "url": "https://pokeapi.co/api/v2/version-group/15/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "omega-ruby-alpha-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/16/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "sun-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/17/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "ultra-sun-ultra-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/18/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "sleep-talk",
              "url": "https://pokeapi.co/api/v2/move/214/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "gold-silver",
                      "url": "https://pokeapi.co/api/v2/version-group/3/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "crystal",
                      "url": "https://pokeapi.co/api/v2/version-group/4/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "emerald",
                      "url": "https://pokeapi.co/api/v2/version-group/6/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "diamond-pearl",
                      "url": "https://pokeapi.co/api/v2/version-group/8/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "platinum",
                      "url": "https://pokeapi.co/api/v2/version-group/9/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "heartgold-soulsilver",
                      "url": "https://pokeapi.co/api/v2/version-group/10/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "black-2-white-2",
                      "url": "https://pokeapi.co/api/v2/version-group/14/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "x-y",
                      "url": "https://pokeapi.co/api/v2/version-group/15/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "omega-ruby-alpha-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/16/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "sun-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/17/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "ultra-sun-ultra-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/18/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "return",
              "url": "https://pokeapi.co/api/v2/move/216/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "gold-silver",
                      "url": "https://pokeapi.co/api/v2/version-group/3/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "crystal",
                      "url": "https://pokeapi.co/api/v2/version-group/4/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "ruby-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/5/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "emerald",
                      "url": "https://pokeapi.co/api/v2/version-group/6/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "firered-leafgreen",
                      "url": "https://pokeapi.co/api/v2/version-group/7/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "diamond-pearl",
                      "url": "https://pokeapi.co/api/v2/version-group/8/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "platinum",
                      "url": "https://pokeapi.co/api/v2/version-group/9/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "heartgold-soulsilver",
                      "url": "https://pokeapi.co/api/v2/version-group/10/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "black-white",
                      "url": "https://pokeapi.co/api/v2/version-group/11/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "colosseum",
                      "url": "https://pokeapi.co/api/v2/version-group/12/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "xd",
                      "url": "https://pokeapi.co/api/v2/version-group/13/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "black-2-white-2",
                      "url": "https://pokeapi.co/api/v2/version-group/14/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "x-y",
                      "url": "https://pokeapi.co/api/v2/version-group/15/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "omega-ruby-alpha-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/16/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "sun-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/17/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "ultra-sun-ultra-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/18/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "frustration",
              "url": "https://pokeapi.co/api/v2/move/218/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "gold-silver",
                      "url": "https://pokeapi.co/api/v2/version-group/3/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "crystal",
                      "url": "https://pokeapi.co/api/v2/version-group/4/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "ruby-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/5/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "emerald",
                      "url": "https://pokeapi.co/api/v2/version-group/6/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "firered-leafgreen",
                      "url": "https://pokeapi.co/api/v2/version-group/7/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "diamond-pearl",
                      "url": "https://pokeapi.co/api/v2/version-group/8/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "platinum",
                      "url": "https://pokeapi.co/api/v2/version-group/9/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "heartgold-soulsilver",
                      "url": "https://pokeapi.co/api/v2/version-group/10/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "black-white",
                      "url": "https://pokeapi.co/api/v2/version-group/11/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "colosseum",
                      "url": "https://pokeapi.co/api/v2/version-group/12/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "xd",
                      "url": "https://pokeapi.co/api/v2/version-group/13/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "black-2-white-2",
                      "url": "https://pokeapi.co/api/v2/version-group/14/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "x-y",
                      "url": "https://pokeapi.co/api/v2/version-group/15/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "omega-ruby-alpha-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/16/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "sun-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/17/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "ultra-sun-ultra-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/18/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "dynamic-punch",
              "url": "https://pokeapi.co/api/v2/move/223/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "gold-silver",
                      "url": "https://pokeapi.co/api/v2/version-group/3/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "crystal",
                      "url": "https://pokeapi.co/api/v2/version-group/4/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "emerald",
                      "url": "https://pokeapi.co/api/v2/version-group/6/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "iron-tail",
              "url": "https://pokeapi.co/api/v2/move/231/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "gold-silver",
                      "url": "https://pokeapi.co/api/v2/version-group/3/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "crystal",
                      "url": "https://pokeapi.co/api/v2/version-group/4/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "ruby-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/5/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "emerald",
                      "url": "https://pokeapi.co/api/v2/version-group/6/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "firered-leafgreen",
                      "url": "https://pokeapi.co/api/v2/version-group/7/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "diamond-pearl",
                      "url": "https://pokeapi.co/api/v2/version-group/8/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "platinum",
                      "url": "https://pokeapi.co/api/v2/version-group/9/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "heartgold-soulsilver",
                      "url": "https://pokeapi.co/api/v2/version-group/10/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "colosseum",
                      "url": "https://pokeapi.co/api/v2/version-group/12/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "xd",
                      "url": "https://pokeapi.co/api/v2/version-group/13/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "black-2-white-2",
                      "url": "https://pokeapi.co/api/v2/version-group/14/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "omega-ruby-alpha-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/16/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "hidden-power",
              "url": "https://pokeapi.co/api/v2/move/237/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "gold-silver",
                      "url": "https://pokeapi.co/api/v2/version-group/3/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "crystal",
                      "url": "https://pokeapi.co/api/v2/version-group/4/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "ruby-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/5/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "emerald",
                      "url": "https://pokeapi.co/api/v2/version-group/6/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "firered-leafgreen",
                      "url": "https://pokeapi.co/api/v2/version-group/7/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "diamond-pearl",
                      "url": "https://pokeapi.co/api/v2/version-group/8/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "platinum",
                      "url": "https://pokeapi.co/api/v2/version-group/9/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "heartgold-soulsilver",
                      "url": "https://pokeapi.co/api/v2/version-group/10/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "black-white",
                      "url": "https://pokeapi.co/api/v2/version-group/11/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "colosseum",
                      "url": "https://pokeapi.co/api/v2/version-group/12/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "xd",
                      "url": "https://pokeapi.co/api/v2/version-group/13/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "black-2-white-2",
                      "url": "https://pokeapi.co/api/v2/version-group/14/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "x-y",
                      "url": "https://pokeapi.co/api/v2/version-group/15/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "omega-ruby-alpha-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/16/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "sun-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/17/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "ultra-sun-ultra-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/18/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "rain-dance",
              "url": "https://pokeapi.co/api/v2/move/240/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "gold-silver",
                      "url": "https://pokeapi.co/api/v2/version-group/3/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "crystal",
                      "url": "https://pokeapi.co/api/v2/version-group/4/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "ruby-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/5/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "emerald",
                      "url": "https://pokeapi.co/api/v2/version-group/6/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "firered-leafgreen",
                      "url": "https://pokeapi.co/api/v2/version-group/7/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "diamond-pearl",
                      "url": "https://pokeapi.co/api/v2/version-group/8/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "platinum",
                      "url": "https://pokeapi.co/api/v2/version-group/9/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "heartgold-soulsilver",
                      "url": "https://pokeapi.co/api/v2/version-group/10/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "black-white",
                      "url": "https://pokeapi.co/api/v2/version-group/11/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "colosseum",
                      "url": "https://pokeapi.co/api/v2/version-group/12/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "xd",
                      "url": "https://pokeapi.co/api/v2/version-group/13/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "black-2-white-2",
                      "url": "https://pokeapi.co/api/v2/version-group/14/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "x-y",
                      "url": "https://pokeapi.co/api/v2/version-group/15/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "omega-ruby-alpha-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/16/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "sun-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/17/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "ultra-sun-ultra-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/18/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "rock-smash",
              "url": "https://pokeapi.co/api/v2/move/249/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "ruby-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/5/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "emerald",
                      "url": "https://pokeapi.co/api/v2/version-group/6/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "firered-leafgreen",
                      "url": "https://pokeapi.co/api/v2/version-group/7/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "diamond-pearl",
                      "url": "https://pokeapi.co/api/v2/version-group/8/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "platinum",
                      "url": "https://pokeapi.co/api/v2/version-group/9/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "heartgold-soulsilver",
                      "url": "https://pokeapi.co/api/v2/version-group/10/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "black-white",
                      "url": "https://pokeapi.co/api/v2/version-group/11/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "colosseum",
                      "url": "https://pokeapi.co/api/v2/version-group/12/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "xd",
                      "url": "https://pokeapi.co/api/v2/version-group/13/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "black-2-white-2",
                      "url": "https://pokeapi.co/api/v2/version-group/14/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "x-y",
                      "url": "https://pokeapi.co/api/v2/version-group/15/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "omega-ruby-alpha-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/16/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "facade",
              "url": "https://pokeapi.co/api/v2/move/263/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "ruby-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/5/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "emerald",
                      "url": "https://pokeapi.co/api/v2/version-group/6/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "firered-leafgreen",
                      "url": "https://pokeapi.co/api/v2/version-group/7/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "diamond-pearl",
                      "url": "https://pokeapi.co/api/v2/version-group/8/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "platinum",
                      "url": "https://pokeapi.co/api/v2/version-group/9/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "heartgold-soulsilver",
                      "url": "https://pokeapi.co/api/v2/version-group/10/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "black-white",
                      "url": "https://pokeapi.co/api/v2/version-group/11/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "colosseum",
                      "url": "https://pokeapi.co/api/v2/version-group/12/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "xd",
                      "url": "https://pokeapi.co/api/v2/version-group/13/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "black-2-white-2",
                      "url": "https://pokeapi.co/api/v2/version-group/14/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "x-y",
                      "url": "https://pokeapi.co/api/v2/version-group/15/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "omega-ruby-alpha-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/16/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "sun-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/17/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "ultra-sun-ultra-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/18/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "focus-punch",
              "url": "https://pokeapi.co/api/v2/move/264/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "ruby-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/5/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "emerald",
                      "url": "https://pokeapi.co/api/v2/version-group/6/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "firered-leafgreen",
                      "url": "https://pokeapi.co/api/v2/version-group/7/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "diamond-pearl",
                      "url": "https://pokeapi.co/api/v2/version-group/8/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "platinum",
                      "url": "https://pokeapi.co/api/v2/version-group/9/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "heartgold-soulsilver",
                      "url": "https://pokeapi.co/api/v2/version-group/10/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "colosseum",
                      "url": "https://pokeapi.co/api/v2/version-group/12/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "xd",
                      "url": "https://pokeapi.co/api/v2/version-group/13/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "omega-ruby-alpha-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/16/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "helping-hand",
              "url": "https://pokeapi.co/api/v2/move/270/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "platinum",
                      "url": "https://pokeapi.co/api/v2/version-group/9/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "heartgold-soulsilver",
                      "url": "https://pokeapi.co/api/v2/version-group/10/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "black-2-white-2",
                      "url": "https://pokeapi.co/api/v2/version-group/14/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "omega-ruby-alpha-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/16/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "brick-break",
              "url": "https://pokeapi.co/api/v2/move/280/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "ruby-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/5/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "emerald",
                      "url": "https://pokeapi.co/api/v2/version-group/6/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "firered-leafgreen",
                      "url": "https://pokeapi.co/api/v2/version-group/7/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "diamond-pearl",
                      "url": "https://pokeapi.co/api/v2/version-group/8/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "platinum",
                      "url": "https://pokeapi.co/api/v2/version-group/9/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "heartgold-soulsilver",
                      "url": "https://pokeapi.co/api/v2/version-group/10/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "black-white",
                      "url": "https://pokeapi.co/api/v2/version-group/11/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "colosseum",
                      "url": "https://pokeapi.co/api/v2/version-group/12/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "xd",
                      "url": "https://pokeapi.co/api/v2/version-group/13/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "black-2-white-2",
                      "url": "https://pokeapi.co/api/v2/version-group/14/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "x-y",
                      "url": "https://pokeapi.co/api/v2/version-group/15/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "omega-ruby-alpha-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/16/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "sun-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/17/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "ultra-sun-ultra-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/18/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "knock-off",
              "url": "https://pokeapi.co/api/v2/move/282/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "platinum",
                      "url": "https://pokeapi.co/api/v2/version-group/9/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "heartgold-soulsilver",
                      "url": "https://pokeapi.co/api/v2/version-group/10/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "black-2-white-2",
                      "url": "https://pokeapi.co/api/v2/version-group/14/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "omega-ruby-alpha-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/16/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "secret-power",
              "url": "https://pokeapi.co/api/v2/move/290/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "ruby-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/5/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "emerald",
                      "url": "https://pokeapi.co/api/v2/version-group/6/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "firered-leafgreen",
                      "url": "https://pokeapi.co/api/v2/version-group/7/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "diamond-pearl",
                      "url": "https://pokeapi.co/api/v2/version-group/8/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "platinum",
                      "url": "https://pokeapi.co/api/v2/version-group/9/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "heartgold-soulsilver",
                      "url": "https://pokeapi.co/api/v2/version-group/10/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "colosseum",
                      "url": "https://pokeapi.co/api/v2/version-group/12/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "xd",
                      "url": "https://pokeapi.co/api/v2/version-group/13/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "omega-ruby-alpha-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/16/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "signal-beam",
              "url": "https://pokeapi.co/api/v2/move/324/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "platinum",
                      "url": "https://pokeapi.co/api/v2/version-group/9/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "heartgold-soulsilver",
                      "url": "https://pokeapi.co/api/v2/version-group/10/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "black-2-white-2",
                      "url": "https://pokeapi.co/api/v2/version-group/14/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "omega-ruby-alpha-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/16/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "covet",
              "url": "https://pokeapi.co/api/v2/move/343/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "black-2-white-2",
                      "url": "https://pokeapi.co/api/v2/version-group/14/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "omega-ruby-alpha-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/16/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "shock-wave",
              "url": "https://pokeapi.co/api/v2/move/351/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "ruby-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/5/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "emerald",
                      "url": "https://pokeapi.co/api/v2/version-group/6/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "firered-leafgreen",
                      "url": "https://pokeapi.co/api/v2/version-group/7/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "diamond-pearl",
                      "url": "https://pokeapi.co/api/v2/version-group/8/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "platinum",
                      "url": "https://pokeapi.co/api/v2/version-group/9/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "heartgold-soulsilver",
                      "url": "https://pokeapi.co/api/v2/version-group/10/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "colosseum",
                      "url": "https://pokeapi.co/api/v2/version-group/12/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "xd",
                      "url": "https://pokeapi.co/api/v2/version-group/13/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "omega-ruby-alpha-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/16/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "natural-gift",
              "url": "https://pokeapi.co/api/v2/move/363/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "diamond-pearl",
                      "url": "https://pokeapi.co/api/v2/version-group/8/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "platinum",
                      "url": "https://pokeapi.co/api/v2/version-group/9/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "heartgold-soulsilver",
                      "url": "https://pokeapi.co/api/v2/version-group/10/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "feint",
              "url": "https://pokeapi.co/api/v2/move/364/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 29,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "diamond-pearl",
                      "url": "https://pokeapi.co/api/v2/version-group/8/"
                  }
              },
              {
                  "level_learned_at": 29,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "platinum",
                      "url": "https://pokeapi.co/api/v2/version-group/9/"
                  }
              },
              {
                  "level_learned_at": 29,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "heartgold-soulsilver",
                      "url": "https://pokeapi.co/api/v2/version-group/10/"
                  }
              },
              {
                  "level_learned_at": 34,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "black-white",
                      "url": "https://pokeapi.co/api/v2/version-group/11/"
                  }
              },
              {
                  "level_learned_at": 34,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "black-2-white-2",
                      "url": "https://pokeapi.co/api/v2/version-group/14/"
                  }
              },
              {
                  "level_learned_at": 34,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "x-y",
                      "url": "https://pokeapi.co/api/v2/version-group/15/"
                  }
              },
              {
                  "level_learned_at": 21,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "omega-ruby-alpha-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/16/"
                  }
              },
              {
                  "level_learned_at": 21,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "sun-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/17/"
                  }
              },
              {
                  "level_learned_at": 21,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "ultra-sun-ultra-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/18/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "fling",
              "url": "https://pokeapi.co/api/v2/move/374/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "diamond-pearl",
                      "url": "https://pokeapi.co/api/v2/version-group/8/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "platinum",
                      "url": "https://pokeapi.co/api/v2/version-group/9/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "heartgold-soulsilver",
                      "url": "https://pokeapi.co/api/v2/version-group/10/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "black-white",
                      "url": "https://pokeapi.co/api/v2/version-group/11/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "black-2-white-2",
                      "url": "https://pokeapi.co/api/v2/version-group/14/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "x-y",
                      "url": "https://pokeapi.co/api/v2/version-group/15/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "omega-ruby-alpha-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/16/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "sun-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/17/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "ultra-sun-ultra-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/18/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "magnet-rise",
              "url": "https://pokeapi.co/api/v2/move/393/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "platinum",
                      "url": "https://pokeapi.co/api/v2/version-group/9/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "heartgold-soulsilver",
                      "url": "https://pokeapi.co/api/v2/version-group/10/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "black-2-white-2",
                      "url": "https://pokeapi.co/api/v2/version-group/14/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "omega-ruby-alpha-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/16/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "discharge",
              "url": "https://pokeapi.co/api/v2/move/435/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 37,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "diamond-pearl",
                      "url": "https://pokeapi.co/api/v2/version-group/8/"
                  }
              },
              {
                  "level_learned_at": 37,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "platinum",
                      "url": "https://pokeapi.co/api/v2/version-group/9/"
                  }
              },
              {
                  "level_learned_at": 37,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "heartgold-soulsilver",
                      "url": "https://pokeapi.co/api/v2/version-group/10/"
                  }
              },
              {
                  "level_learned_at": 42,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "black-white",
                      "url": "https://pokeapi.co/api/v2/version-group/11/"
                  }
              },
              {
                  "level_learned_at": 42,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "black-2-white-2",
                      "url": "https://pokeapi.co/api/v2/version-group/14/"
                  }
              },
              {
                  "level_learned_at": 42,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "x-y",
                      "url": "https://pokeapi.co/api/v2/version-group/15/"
                  }
              },
              {
                  "level_learned_at": 34,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "omega-ruby-alpha-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/16/"
                  }
              },
              {
                  "level_learned_at": 34,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "sun-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/17/"
                  }
              },
              {
                  "level_learned_at": 34,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "ultra-sun-ultra-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/18/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "captivate",
              "url": "https://pokeapi.co/api/v2/move/445/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "diamond-pearl",
                      "url": "https://pokeapi.co/api/v2/version-group/8/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "platinum",
                      "url": "https://pokeapi.co/api/v2/version-group/9/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "heartgold-soulsilver",
                      "url": "https://pokeapi.co/api/v2/version-group/10/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "grass-knot",
              "url": "https://pokeapi.co/api/v2/move/447/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "diamond-pearl",
                      "url": "https://pokeapi.co/api/v2/version-group/8/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "platinum",
                      "url": "https://pokeapi.co/api/v2/version-group/9/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "heartgold-soulsilver",
                      "url": "https://pokeapi.co/api/v2/version-group/10/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "black-white",
                      "url": "https://pokeapi.co/api/v2/version-group/11/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "black-2-white-2",
                      "url": "https://pokeapi.co/api/v2/version-group/14/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "x-y",
                      "url": "https://pokeapi.co/api/v2/version-group/15/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "omega-ruby-alpha-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/16/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "sun-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/17/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "ultra-sun-ultra-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/18/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "charge-beam",
              "url": "https://pokeapi.co/api/v2/move/451/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "diamond-pearl",
                      "url": "https://pokeapi.co/api/v2/version-group/8/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "platinum",
                      "url": "https://pokeapi.co/api/v2/version-group/9/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "heartgold-soulsilver",
                      "url": "https://pokeapi.co/api/v2/version-group/10/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "black-white",
                      "url": "https://pokeapi.co/api/v2/version-group/11/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "black-2-white-2",
                      "url": "https://pokeapi.co/api/v2/version-group/14/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "x-y",
                      "url": "https://pokeapi.co/api/v2/version-group/15/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "omega-ruby-alpha-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/16/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "sun-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/17/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "ultra-sun-ultra-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/18/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "electro-ball",
              "url": "https://pokeapi.co/api/v2/move/486/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 18,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "black-white",
                      "url": "https://pokeapi.co/api/v2/version-group/11/"
                  }
              },
              {
                  "level_learned_at": 18,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "black-2-white-2",
                      "url": "https://pokeapi.co/api/v2/version-group/14/"
                  }
              },
              {
                  "level_learned_at": 18,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "x-y",
                      "url": "https://pokeapi.co/api/v2/version-group/15/"
                  }
              },
              {
                  "level_learned_at": 13,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "omega-ruby-alpha-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/16/"
                  }
              },
              {
                  "level_learned_at": 13,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "sun-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/17/"
                  }
              },
              {
                  "level_learned_at": 13,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "ultra-sun-ultra-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/18/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "round",
              "url": "https://pokeapi.co/api/v2/move/496/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "black-white",
                      "url": "https://pokeapi.co/api/v2/version-group/11/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "black-2-white-2",
                      "url": "https://pokeapi.co/api/v2/version-group/14/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "x-y",
                      "url": "https://pokeapi.co/api/v2/version-group/15/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "omega-ruby-alpha-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/16/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "sun-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/17/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "ultra-sun-ultra-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/18/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "echoed-voice",
              "url": "https://pokeapi.co/api/v2/move/497/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "black-white",
                      "url": "https://pokeapi.co/api/v2/version-group/11/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "black-2-white-2",
                      "url": "https://pokeapi.co/api/v2/version-group/14/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "x-y",
                      "url": "https://pokeapi.co/api/v2/version-group/15/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "omega-ruby-alpha-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/16/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "sun-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/17/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "ultra-sun-ultra-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/18/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "volt-switch",
              "url": "https://pokeapi.co/api/v2/move/521/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "black-white",
                      "url": "https://pokeapi.co/api/v2/version-group/11/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "black-2-white-2",
                      "url": "https://pokeapi.co/api/v2/version-group/14/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "x-y",
                      "url": "https://pokeapi.co/api/v2/version-group/15/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "omega-ruby-alpha-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/16/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "sun-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/17/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "ultra-sun-ultra-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/18/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "electroweb",
              "url": "https://pokeapi.co/api/v2/move/527/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "tutor",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/3/"
                  },
                  "version_group": {
                      "name": "omega-ruby-alpha-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/16/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "wild-charge",
              "url": "https://pokeapi.co/api/v2/move/528/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "black-white",
                      "url": "https://pokeapi.co/api/v2/version-group/11/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "black-2-white-2",
                      "url": "https://pokeapi.co/api/v2/version-group/14/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "x-y",
                      "url": "https://pokeapi.co/api/v2/version-group/15/"
                  }
              },
              {
                  "level_learned_at": 50,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "omega-ruby-alpha-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/16/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "omega-ruby-alpha-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/16/"
                  }
              },
              {
                  "level_learned_at": 50,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "sun-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/17/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "sun-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/17/"
                  }
              },
              {
                  "level_learned_at": 50,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "ultra-sun-ultra-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/18/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "ultra-sun-ultra-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/18/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "play-nice",
              "url": "https://pokeapi.co/api/v2/move/589/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 7,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "x-y",
                      "url": "https://pokeapi.co/api/v2/version-group/15/"
                  }
              },
              {
                  "level_learned_at": 7,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "omega-ruby-alpha-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/16/"
                  }
              },
              {
                  "level_learned_at": 7,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "sun-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/17/"
                  }
              },
              {
                  "level_learned_at": 7,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "ultra-sun-ultra-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/18/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "confide",
              "url": "https://pokeapi.co/api/v2/move/590/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "x-y",
                      "url": "https://pokeapi.co/api/v2/version-group/15/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "omega-ruby-alpha-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/16/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "sun-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/17/"
                  }
              },
              {
                  "level_learned_at": 0,
                  "move_learn_method": {
                      "name": "machine",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/4/"
                  },
                  "version_group": {
                      "name": "ultra-sun-ultra-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/18/"
                  }
              }
          ]
      },
      {
          "move": {
              "name": "nuzzle",
              "url": "https://pokeapi.co/api/v2/move/609/"
          },
          "version_group_details": [
              {
                  "level_learned_at": 23,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "x-y",
                      "url": "https://pokeapi.co/api/v2/version-group/15/"
                  }
              },
              {
                  "level_learned_at": 29,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "omega-ruby-alpha-sapphire",
                      "url": "https://pokeapi.co/api/v2/version-group/16/"
                  }
              },
              {
                  "level_learned_at": 29,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "sun-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/17/"
                  }
              },
              {
                  "level_learned_at": 29,
                  "move_learn_method": {
                      "name": "level-up",
                      "url": "https://pokeapi.co/api/v2/move-learn-method/1/"
                  },
                  "version_group": {
                      "name": "ultra-sun-ultra-moon",
                      "url": "https://pokeapi.co/api/v2/version-group/18/"
                  }
              }
          ]
      }
  ],
  "name": "pikachu",
  "order": 35,
  "past_types": [],
  "species": {
      "name": "pikachu",
      "url": "https://pokeapi.co/api/v2/pokemon-species/25/"
  },
  "sprites": {
      "back_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/25.png",
      "back_female": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/female/25.png",
      "back_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/25.png",
      "back_shiny_female": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/female/25.png",
      "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
      "front_female": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/female/25.png",
      "front_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/25.png",
      "front_shiny_female": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/female/25.png",
      "other": {
          "dream_world": {
              "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg",
              "front_female": null
          },
          "official-artwork": {
              "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
          }
      },
      "versions": {
          "generation-i": {
              "red-blue": {
                  "back_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/back/25.png",
                  "back_gray": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/back/gray/25.png",
                  "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/25.png",
                  "front_gray": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/gray/25.png"
              },
              "yellow": {
                  "back_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/yellow/back/25.png",
                  "back_gray": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/yellow/back/gray/25.png",
                  "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/yellow/25.png",
                  "front_gray": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/yellow/gray/25.png"
              }
          },
          "generation-ii": {
              "crystal": {
                  "back_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/back/25.png",
                  "back_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/back/shiny/25.png",
                  "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/25.png",
                  "front_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/shiny/25.png"
              },
              "gold": {
                  "back_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/gold/back/25.png",
                  "back_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/gold/back/shiny/25.png",
                  "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/gold/25.png",
                  "front_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/gold/shiny/25.png"
              },
              "silver": {
                  "back_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/silver/back/25.png",
                  "back_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/silver/back/shiny/25.png",
                  "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/silver/25.png",
                  "front_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/silver/shiny/25.png"
              }
          },
          "generation-iii": {
              "emerald": {
                  "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/25.png",
                  "front_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/shiny/25.png"
              },
              "firered-leafgreen": {
                  "back_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/back/25.png",
                  "back_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/back/shiny/25.png",
                  "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/25.png",
                  "front_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/shiny/25.png"
              },
              "ruby-sapphire": {
                  "back_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/ruby-sapphire/back/25.png",
                  "back_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/ruby-sapphire/back/shiny/25.png",
                  "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/ruby-sapphire/25.png",
                  "front_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/ruby-sapphire/shiny/25.png"
              }
          },
          "generation-iv": {
              "diamond-pearl": {
                  "back_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/diamond-pearl/back/25.png",
                  "back_female": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/diamond-pearl/back/female/25.png",
                  "back_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/diamond-pearl/back/shiny/25.png",
                  "back_shiny_female": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/diamond-pearl/back/shiny/female/25.png",
                  "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/diamond-pearl/25.png",
                  "front_female": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/diamond-pearl/female/25.png",
                  "front_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/diamond-pearl/shiny/25.png",
                  "front_shiny_female": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/diamond-pearl/shiny/female/25.png"
              },
              "heartgold-soulsilver": {
                  "back_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/heartgold-soulsilver/back/25.png",
                  "back_female": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/heartgold-soulsilver/back/female/25.png",
                  "back_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/heartgold-soulsilver/back/shiny/25.png",
                  "back_shiny_female": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/heartgold-soulsilver/back/shiny/female/25.png",
                  "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/heartgold-soulsilver/25.png",
                  "front_female": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/heartgold-soulsilver/female/25.png",
                  "front_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/heartgold-soulsilver/shiny/25.png",
                  "front_shiny_female": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/heartgold-soulsilver/shiny/female/25.png"
              },
              "platinum": {
                  "back_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/platinum/back/25.png",
                  "back_female": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/platinum/back/female/25.png",
                  "back_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/platinum/back/shiny/25.png",
                  "back_shiny_female": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/platinum/back/shiny/female/25.png",
                  "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/platinum/25.png",
                  "front_female": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/platinum/female/25.png",
                  "front_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/platinum/shiny/25.png",
                  "front_shiny_female": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/platinum/shiny/female/25.png"
              }
          },
          "generation-v": {
              "black-white": {
                  "animated": {
                      "back_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/25.gif",
                      "back_female": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/female/25.gif",
                      "back_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/shiny/25.gif",
                      "back_shiny_female": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/shiny/female/25.gif",
                      "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/25.gif",
                      "front_female": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/female/25.gif",
                      "front_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny/25.gif",
                      "front_shiny_female": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny/female/25.gif"
                  },
                  "back_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/back/25.png",
                  "back_female": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/back/female/25.png",
                  "back_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/back/shiny/25.png",
                  "back_shiny_female": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/back/shiny/female/25.png",
                  "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/25.png",
                  "front_female": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/female/25.png",
                  "front_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/shiny/25.png",
                  "front_shiny_female": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/shiny/female/25.png"
              }
          },
          "generation-vi": {
              "omegaruby-alphasapphire": {
                  "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vi/omegaruby-alphasapphire/25.png",
                  "front_female": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vi/omegaruby-alphasapphire/female/25.png",
                  "front_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vi/omegaruby-alphasapphire/shiny/25.png",
                  "front_shiny_female": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vi/omegaruby-alphasapphire/shiny/female/25.png"
              },
              "x-y": {
                  "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vi/x-y/25.png",
                  "front_female": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vi/x-y/female/25.png",
                  "front_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vi/x-y/shiny/25.png",
                  "front_shiny_female": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vi/x-y/shiny/female/25.png"
              }
          },
          "generation-vii": {
              "icons": {
                  "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/icons/25.png",
                  "front_female": null
              },
              "ultra-sun-ultra-moon": {
                  "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/ultra-sun-ultra-moon/25.png",
                  "front_female": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/ultra-sun-ultra-moon/female/25.png",
                  "front_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/ultra-sun-ultra-moon/shiny/25.png",
                  "front_shiny_female": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/ultra-sun-ultra-moon/shiny/female/25.png"
              }
          },
          "generation-viii": {
              "icons": {
                  "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/25.png",
                  "front_female": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/female/25.png"
              }
          }
      }
  },
  "stats": [
      {
          "base_stat": 35,
          "effort": 0,
          "stat": {
              "name": "hp",
              "url": "https://pokeapi.co/api/v2/stat/1/"
          }
      },
      {
          "base_stat": 55,
          "effort": 0,
          "stat": {
              "name": "attack",
              "url": "https://pokeapi.co/api/v2/stat/2/"
          }
      },
      {
          "base_stat": 40,
          "effort": 0,
          "stat": {
              "name": "defense",
              "url": "https://pokeapi.co/api/v2/stat/3/"
          }
      },
      {
          "base_stat": 50,
          "effort": 0,
          "stat": {
              "name": "special-attack",
              "url": "https://pokeapi.co/api/v2/stat/4/"
          }
      },
      {
          "base_stat": 50,
          "effort": 0,
          "stat": {
              "name": "special-defense",
              "url": "https://pokeapi.co/api/v2/stat/5/"
          }
      },
      {
          "base_stat": 90,
          "effort": 2,
          "stat": {
              "name": "speed",
              "url": "https://pokeapi.co/api/v2/stat/6/"
          }
      }
  ],
  "types": [
      {
          "slot": 1,
          "type": {
              "name": "electric",
              "url": "https://pokeapi.co/api/v2/type/13/"
          }
      }
  ],
  "weight": 60
};

const electric = {
  "damage_relations": {
      "double_damage_from": [
          {
              "name": "ground",
              "url": "https://pokeapi.co/api/v2/type/5/"
          }
      ],
      "double_damage_to": [
          {
              "name": "flying",
              "url": "https://pokeapi.co/api/v2/type/3/"
          },
          {
              "name": "water",
              "url": "https://pokeapi.co/api/v2/type/11/"
          }
      ],
      "half_damage_from": [
          {
              "name": "flying",
              "url": "https://pokeapi.co/api/v2/type/3/"
          },
          {
              "name": "steel",
              "url": "https://pokeapi.co/api/v2/type/9/"
          },
          {
              "name": "electric",
              "url": "https://pokeapi.co/api/v2/type/13/"
          }
      ],
      "half_damage_to": [
          {
              "name": "grass",
              "url": "https://pokeapi.co/api/v2/type/12/"
          },
          {
              "name": "electric",
              "url": "https://pokeapi.co/api/v2/type/13/"
          },
          {
              "name": "dragon",
              "url": "https://pokeapi.co/api/v2/type/16/"
          }
      ],
      "no_damage_from": [],
      "no_damage_to": [
          {
              "name": "ground",
              "url": "https://pokeapi.co/api/v2/type/5/"
          }
      ]
  },
  "game_indices": [
      {
          "game_index": 23,
          "generation": {
              "name": "generation-i",
              "url": "https://pokeapi.co/api/v2/generation/1/"
          }
      },
      {
          "game_index": 23,
          "generation": {
              "name": "generation-ii",
              "url": "https://pokeapi.co/api/v2/generation/2/"
          }
      },
      {
          "game_index": 13,
          "generation": {
              "name": "generation-iii",
              "url": "https://pokeapi.co/api/v2/generation/3/"
          }
      },
      {
          "game_index": 13,
          "generation": {
              "name": "generation-iv",
              "url": "https://pokeapi.co/api/v2/generation/4/"
          }
      },
      {
          "game_index": 12,
          "generation": {
              "name": "generation-v",
              "url": "https://pokeapi.co/api/v2/generation/5/"
          }
      },
      {
          "game_index": 12,
          "generation": {
              "name": "generation-vi",
              "url": "https://pokeapi.co/api/v2/generation/6/"
          }
      }
  ],
  "generation": {
      "name": "generation-i",
      "url": "https://pokeapi.co/api/v2/generation/1/"
  },
  "id": 13,
  "move_damage_class": {
      "name": "special",
      "url": "https://pokeapi.co/api/v2/move-damage-class/3/"
  },
  "moves": [
      {
          "name": "thunder-punch",
          "url": "https://pokeapi.co/api/v2/move/9/"
      },
      {
          "name": "thunder-shock",
          "url": "https://pokeapi.co/api/v2/move/84/"
      },
      {
          "name": "thunderbolt",
          "url": "https://pokeapi.co/api/v2/move/85/"
      },
      {
          "name": "thunder-wave",
          "url": "https://pokeapi.co/api/v2/move/86/"
      },
      {
          "name": "thunder",
          "url": "https://pokeapi.co/api/v2/move/87/"
      },
      {
          "name": "zap-cannon",
          "url": "https://pokeapi.co/api/v2/move/192/"
      },
      {
          "name": "spark",
          "url": "https://pokeapi.co/api/v2/move/209/"
      },
      {
          "name": "charge",
          "url": "https://pokeapi.co/api/v2/move/268/"
      },
      {
          "name": "volt-tackle",
          "url": "https://pokeapi.co/api/v2/move/344/"
      },
      {
          "name": "shock-wave",
          "url": "https://pokeapi.co/api/v2/move/351/"
      },
      {
          "name": "magnet-rise",
          "url": "https://pokeapi.co/api/v2/move/393/"
      },
      {
          "name": "thunder-fang",
          "url": "https://pokeapi.co/api/v2/move/422/"
      },
      {
          "name": "discharge",
          "url": "https://pokeapi.co/api/v2/move/435/"
      },
      {
          "name": "charge-beam",
          "url": "https://pokeapi.co/api/v2/move/451/"
      },
      {
          "name": "electro-ball",
          "url": "https://pokeapi.co/api/v2/move/486/"
      },
      {
          "name": "volt-switch",
          "url": "https://pokeapi.co/api/v2/move/521/"
      },
      {
          "name": "electroweb",
          "url": "https://pokeapi.co/api/v2/move/527/"
      },
      {
          "name": "wild-charge",
          "url": "https://pokeapi.co/api/v2/move/528/"
      },
      {
          "name": "bolt-strike",
          "url": "https://pokeapi.co/api/v2/move/550/"
      },
      {
          "name": "fusion-bolt",
          "url": "https://pokeapi.co/api/v2/move/559/"
      },
      {
          "name": "ion-deluge",
          "url": "https://pokeapi.co/api/v2/move/569/"
      },
      {
          "name": "parabolic-charge",
          "url": "https://pokeapi.co/api/v2/move/570/"
      },
      {
          "name": "electrify",
          "url": "https://pokeapi.co/api/v2/move/582/"
      },
      {
          "name": "eerie-impulse",
          "url": "https://pokeapi.co/api/v2/move/598/"
      },
      {
          "name": "magnetic-flux",
          "url": "https://pokeapi.co/api/v2/move/602/"
      },
      {
          "name": "electric-terrain",
          "url": "https://pokeapi.co/api/v2/move/604/"
      },
      {
          "name": "nuzzle",
          "url": "https://pokeapi.co/api/v2/move/609/"
      },
      {
          "name": "gigavolt-havoc--physical",
          "url": "https://pokeapi.co/api/v2/move/646/"
      },
      {
          "name": "gigavolt-havoc--special",
          "url": "https://pokeapi.co/api/v2/move/647/"
      },
      {
          "name": "catastropika",
          "url": "https://pokeapi.co/api/v2/move/658/"
      },
      {
          "name": "stoked-sparksurfer",
          "url": "https://pokeapi.co/api/v2/move/700/"
      },
      {
          "name": "zing-zap",
          "url": "https://pokeapi.co/api/v2/move/716/"
      },
      {
          "name": "10-000-000-volt-thunderbolt",
          "url": "https://pokeapi.co/api/v2/move/719/"
      },
      {
          "name": "plasma-fists",
          "url": "https://pokeapi.co/api/v2/move/721/"
      },
      {
          "name": "zippy-zap",
          "url": "https://pokeapi.co/api/v2/move/729/"
      },
      {
          "name": "pika-papow",
          "url": "https://pokeapi.co/api/v2/move/732/"
      },
      {
          "name": "buzzy-buzz",
          "url": "https://pokeapi.co/api/v2/move/734/"
      },
      {
          "name": "bolt-beak",
          "url": "https://pokeapi.co/api/v2/move/754/"
      },
      {
          "name": "max-lightning",
          "url": "https://pokeapi.co/api/v2/move/759/"
      },
      {
          "name": "aura-wheel",
          "url": "https://pokeapi.co/api/v2/move/783/"
      },
      {
          "name": "overdrive",
          "url": "https://pokeapi.co/api/v2/move/786/"
      },
      {
          "name": "rising-voltage",
          "url": "https://pokeapi.co/api/v2/move/804/"
      },
      {
          "name": "thunder-cage",
          "url": "https://pokeapi.co/api/v2/move/819/"
      }
  ],
  "name": "electric",
  "names": [
      {
          "language": {
              "name": "ja-Hrkt",
              "url": "https://pokeapi.co/api/v2/language/1/"
          },
          "name": "でんき"
      },
      {
          "language": {
              "name": "ko",
              "url": "https://pokeapi.co/api/v2/language/3/"
          },
          "name": "전기"
      },
      {
          "language": {
              "name": "fr",
              "url": "https://pokeapi.co/api/v2/language/5/"
          },
          "name": "Électrik"
      },
      {
          "language": {
              "name": "de",
              "url": "https://pokeapi.co/api/v2/language/6/"
          },
          "name": "Elektro"
      },
      {
          "language": {
              "name": "es",
              "url": "https://pokeapi.co/api/v2/language/7/"
          },
          "name": "Eléctrico"
      },
      {
          "language": {
              "name": "it",
              "url": "https://pokeapi.co/api/v2/language/8/"
          },
          "name": "Elettro"
      },
      {
          "language": {
              "name": "en",
              "url": "https://pokeapi.co/api/v2/language/9/"
          },
          "name": "Electric"
      }
  ],
  "pokemon": [
      {
          "pokemon": {
              "name": "pikachu",
              "url": "https://pokeapi.co/api/v2/pokemon/25/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "raichu",
              "url": "https://pokeapi.co/api/v2/pokemon/26/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "magnemite",
              "url": "https://pokeapi.co/api/v2/pokemon/81/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "magneton",
              "url": "https://pokeapi.co/api/v2/pokemon/82/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "voltorb",
              "url": "https://pokeapi.co/api/v2/pokemon/100/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "electrode",
              "url": "https://pokeapi.co/api/v2/pokemon/101/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "electabuzz",
              "url": "https://pokeapi.co/api/v2/pokemon/125/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "jolteon",
              "url": "https://pokeapi.co/api/v2/pokemon/135/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "zapdos",
              "url": "https://pokeapi.co/api/v2/pokemon/145/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "chinchou",
              "url": "https://pokeapi.co/api/v2/pokemon/170/"
          },
          "slot": 2
      },
      {
          "pokemon": {
              "name": "lanturn",
              "url": "https://pokeapi.co/api/v2/pokemon/171/"
          },
          "slot": 2
      },
      {
          "pokemon": {
              "name": "pichu",
              "url": "https://pokeapi.co/api/v2/pokemon/172/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "mareep",
              "url": "https://pokeapi.co/api/v2/pokemon/179/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "flaaffy",
              "url": "https://pokeapi.co/api/v2/pokemon/180/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "ampharos",
              "url": "https://pokeapi.co/api/v2/pokemon/181/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "elekid",
              "url": "https://pokeapi.co/api/v2/pokemon/239/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "raikou",
              "url": "https://pokeapi.co/api/v2/pokemon/243/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "electrike",
              "url": "https://pokeapi.co/api/v2/pokemon/309/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "manectric",
              "url": "https://pokeapi.co/api/v2/pokemon/310/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "plusle",
              "url": "https://pokeapi.co/api/v2/pokemon/311/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "minun",
              "url": "https://pokeapi.co/api/v2/pokemon/312/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "shinx",
              "url": "https://pokeapi.co/api/v2/pokemon/403/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "luxio",
              "url": "https://pokeapi.co/api/v2/pokemon/404/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "luxray",
              "url": "https://pokeapi.co/api/v2/pokemon/405/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "pachirisu",
              "url": "https://pokeapi.co/api/v2/pokemon/417/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "magnezone",
              "url": "https://pokeapi.co/api/v2/pokemon/462/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "electivire",
              "url": "https://pokeapi.co/api/v2/pokemon/466/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "rotom",
              "url": "https://pokeapi.co/api/v2/pokemon/479/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "blitzle",
              "url": "https://pokeapi.co/api/v2/pokemon/522/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "zebstrika",
              "url": "https://pokeapi.co/api/v2/pokemon/523/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "emolga",
              "url": "https://pokeapi.co/api/v2/pokemon/587/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "joltik",
              "url": "https://pokeapi.co/api/v2/pokemon/595/"
          },
          "slot": 2
      },
      {
          "pokemon": {
              "name": "galvantula",
              "url": "https://pokeapi.co/api/v2/pokemon/596/"
          },
          "slot": 2
      },
      {
          "pokemon": {
              "name": "tynamo",
              "url": "https://pokeapi.co/api/v2/pokemon/602/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "eelektrik",
              "url": "https://pokeapi.co/api/v2/pokemon/603/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "eelektross",
              "url": "https://pokeapi.co/api/v2/pokemon/604/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "stunfisk",
              "url": "https://pokeapi.co/api/v2/pokemon/618/"
          },
          "slot": 2
      },
      {
          "pokemon": {
              "name": "thundurus-incarnate",
              "url": "https://pokeapi.co/api/v2/pokemon/642/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "zekrom",
              "url": "https://pokeapi.co/api/v2/pokemon/644/"
          },
          "slot": 2
      },
      {
          "pokemon": {
              "name": "helioptile",
              "url": "https://pokeapi.co/api/v2/pokemon/694/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "heliolisk",
              "url": "https://pokeapi.co/api/v2/pokemon/695/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "dedenne",
              "url": "https://pokeapi.co/api/v2/pokemon/702/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "charjabug",
              "url": "https://pokeapi.co/api/v2/pokemon/737/"
          },
          "slot": 2
      },
      {
          "pokemon": {
              "name": "vikavolt",
              "url": "https://pokeapi.co/api/v2/pokemon/738/"
          },
          "slot": 2
      },
      {
          "pokemon": {
              "name": "togedemaru",
              "url": "https://pokeapi.co/api/v2/pokemon/777/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "tapu-koko",
              "url": "https://pokeapi.co/api/v2/pokemon/785/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "xurkitree",
              "url": "https://pokeapi.co/api/v2/pokemon/796/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "zeraora",
              "url": "https://pokeapi.co/api/v2/pokemon/807/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "yamper",
              "url": "https://pokeapi.co/api/v2/pokemon/835/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "boltund",
              "url": "https://pokeapi.co/api/v2/pokemon/836/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "toxel",
              "url": "https://pokeapi.co/api/v2/pokemon/848/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "toxtricity-amped",
              "url": "https://pokeapi.co/api/v2/pokemon/849/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "pincurchin",
              "url": "https://pokeapi.co/api/v2/pokemon/871/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "morpeko",
              "url": "https://pokeapi.co/api/v2/pokemon/877/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "dracozolt",
              "url": "https://pokeapi.co/api/v2/pokemon/880/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "arctozolt",
              "url": "https://pokeapi.co/api/v2/pokemon/881/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "regieleki",
              "url": "https://pokeapi.co/api/v2/pokemon/894/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "rotom-heat",
              "url": "https://pokeapi.co/api/v2/pokemon/10008/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "rotom-wash",
              "url": "https://pokeapi.co/api/v2/pokemon/10009/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "rotom-frost",
              "url": "https://pokeapi.co/api/v2/pokemon/10010/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "rotom-fan",
              "url": "https://pokeapi.co/api/v2/pokemon/10011/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "rotom-mow",
              "url": "https://pokeapi.co/api/v2/pokemon/10012/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "thundurus-therian",
              "url": "https://pokeapi.co/api/v2/pokemon/10020/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "ampharos-mega",
              "url": "https://pokeapi.co/api/v2/pokemon/10045/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "manectric-mega",
              "url": "https://pokeapi.co/api/v2/pokemon/10055/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "pikachu-rock-star",
              "url": "https://pokeapi.co/api/v2/pokemon/10080/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "pikachu-belle",
              "url": "https://pokeapi.co/api/v2/pokemon/10081/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "pikachu-pop-star",
              "url": "https://pokeapi.co/api/v2/pokemon/10082/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "pikachu-phd",
              "url": "https://pokeapi.co/api/v2/pokemon/10083/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "pikachu-libre",
              "url": "https://pokeapi.co/api/v2/pokemon/10084/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "pikachu-cosplay",
              "url": "https://pokeapi.co/api/v2/pokemon/10085/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "pikachu-original-cap",
              "url": "https://pokeapi.co/api/v2/pokemon/10094/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "pikachu-hoenn-cap",
              "url": "https://pokeapi.co/api/v2/pokemon/10095/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "pikachu-sinnoh-cap",
              "url": "https://pokeapi.co/api/v2/pokemon/10096/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "pikachu-unova-cap",
              "url": "https://pokeapi.co/api/v2/pokemon/10097/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "pikachu-kalos-cap",
              "url": "https://pokeapi.co/api/v2/pokemon/10098/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "pikachu-alola-cap",
              "url": "https://pokeapi.co/api/v2/pokemon/10099/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "raichu-alola",
              "url": "https://pokeapi.co/api/v2/pokemon/10100/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "geodude-alola",
              "url": "https://pokeapi.co/api/v2/pokemon/10109/"
          },
          "slot": 2
      },
      {
          "pokemon": {
              "name": "graveler-alola",
              "url": "https://pokeapi.co/api/v2/pokemon/10110/"
          },
          "slot": 2
      },
      {
          "pokemon": {
              "name": "golem-alola",
              "url": "https://pokeapi.co/api/v2/pokemon/10111/"
          },
          "slot": 2
      },
      {
          "pokemon": {
              "name": "vikavolt-totem",
              "url": "https://pokeapi.co/api/v2/pokemon/10122/"
          },
          "slot": 2
      },
      {
          "pokemon": {
              "name": "oricorio-pom-pom",
              "url": "https://pokeapi.co/api/v2/pokemon/10123/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "pikachu-partner-cap",
              "url": "https://pokeapi.co/api/v2/pokemon/10148/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "togedemaru-totem",
              "url": "https://pokeapi.co/api/v2/pokemon/10154/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "toxtricity-low-key",
              "url": "https://pokeapi.co/api/v2/pokemon/10178/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "pikachu-gmax",
              "url": "https://pokeapi.co/api/v2/pokemon/10190/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "toxtricity-amped-gmax",
              "url": "https://pokeapi.co/api/v2/pokemon/10210/"
          },
          "slot": 1
      },
      {
          "pokemon": {
              "name": "toxtricity-low-key-gmax",
              "url": "https://pokeapi.co/api/v2/pokemon/10220/"
          },
          "slot": 1
      }
  ]
};