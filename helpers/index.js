import _ from 'lodash'

export function searchByText(collection, text, exclude) {
    let newtext = _.toLower(text);
    return _.filter(collection, function(object) {
      return _(object).omit(exclude).some(function(str) {
        return _(str).toLower().includes(newtext);
      });
    });
 }