import { Validator } from '../Validator';


const validator = new Validator();

const request_data: object = {
    request_number: '2342342',
    date: '2020-12-12',
}
const rules = {
    "request_number": "required|min:10|max:10",
    "date":           "required|datetime"
}

validator.make(request_data, rules);