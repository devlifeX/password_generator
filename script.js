function password_generator(len,mix,onlyNumber,mixWithSymbols,capitalMixed,uniqe,secure){
      /*
        len = length of random phrase to be generated
        mix = phrase contain both of words and numbers
        onlyNumber = random phrase only include numbers
        mixWithSymbols = random phrase contain symbols
        capitaclmixed = random phrase  contain capital word
        uniqe = random phrase more uniqe than before use date.now() for this purpose
        secure = random phrase very secure prevent to burst password 
        check generated phrase in http://www.passwordmeter.com/ for security
        */
        var _func = {
          private:{
            words : 'abcdefghijklmnopqrstuvwxyz',
            numbers:'0123456789',
            symbols:'!@#$%^&*+-?[]{}<>',
          },
          random:function(length){
            return Math.floor(Math.random()* length)
          },
          explode:function(str){
            return str.split('');
          },
          _typeOf:function(char){

            if(this.private.words.indexOf(char) != -1 ){
              return "word";
            }else if(this.private.numbers.indexOf(char) != -1){
              return "number";
            }else if(this.private.symbols.indexOf(char) != -1){
              return "symbol";
            }else{
              return 'notFound';
            }

          },
          advanced:function(tmp){
            var incomplete = true;
            var result="";
            var tmpChar = '';
            var lastChar='';
            var turn =false;

            while(incomplete){

              if(capitalMixed && turn ){
                turn =false;
                tmpChar = (tmp[this.random(tmp.length)]).toUpperCase();
              }else{
                turn =true;
                tmpChar = (tmp[this.random(tmp.length)]);
              }

              if( result.indexOf(tmpChar) == -1 ){
                if(this._typeOf(lastChar) != this._typeOf(tmpChar)){
                  lastChar = tmpChar; 
                  result+=tmpChar;
                }
              }

              if(result.length >= len){
                incomplete=false;
              }
            }

            return result;


          },
          make:function(){
            var words = this.explode(this.private.words);
            var numbers = this.explode(this.private.numbers);
            var tmp = [];
            var result = "";
            if(mix){
              tmp = words.concat(numbers);
            }else if(mix == false && onlyNumber == false){
              tmp = words;
            }else if(mix == false && onlyNumber){
              tmp = numbers;
            }

            if(mixWithSymbols){
             tmp = tmp.concat( this.explode( this.private.symbols ) );  
           }

           if(uniqe){
             tmp = tmp.concat( this.explode(Date.now().toString()) );  
           }

           if(secure){
            return this.advanced(tmp)
          }

          var tmpChar='';
          var turn =false;

          for(var i = 0 ; i < len ; i++){
            if(capitalMixed && turn){
              turn = false;
              tmpChar = (tmp[this.random(tmp.length)]).toUpperCase();
            }else{
              turn =true;
              tmpChar = tmp[this.random(tmp.length)];
            }
            result += tmpChar;
          }

          return result;
        }
      };

      return _func.make();

    }
    
