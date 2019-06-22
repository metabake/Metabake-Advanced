
const logger = require('tracer').console()


import * as recast from "recast"
import fs = require('fs-extra')

export class Cover {

   file(dir?, fileName?) {

      const f =`function decrementAndAdd(a, b){
         function add(c, d){
            return c + d;
         }
         a--;
         b = b - 1;
         return add(a,b)
      }
      
      function incrementAndMultiply(a, b){
          function multiply(c, d){
            return c * d;
          }
          a++;
          b = b + 1;
          return multiply(a, b)
      }
      `
      console.log('here')
      // fs.readFileSync(fileName).toString())
      const ast = recast.parse(f, {
         parser: require("acorn")
       })

      const functionNames = []
      
      recast.visit(ast , { visitNode: function(path) {
        var newPath = path.get('body')
         
         // sub-traversing
         recast.visit(newPath, { visitNode: function(path) {
            logger.trace(path.node)
            functionNames.push(path.node)
            return false
         }})
      
         // return false to not look at other functions contained in this function
         // leave this role to the sub-traversing
         return false

       }})
       
      console.log(functionNames)
   }//()

}//class

module.exports = {
   Cover
}