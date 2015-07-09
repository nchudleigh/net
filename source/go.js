// © David Hariri, 2015
// Developed while working on Volley

// TODO: Publish to NPM
// TODO: Better error handling
// {{Node Requirements}}

// Define some default settings to use which can be overridden in setup
let settings = {
    headers : {},
    type : 'application/x-www-form-urlencoded; charset=UTF-8'
}

class Request {
    // Define the defaults for all requests
    constructor({method = '', data = {}, address='', options = {}}) {
        // Make a new request with the data provided
        const request = new XMLHttpRequest();
        // Only if the method and address are provided
        if(method.length > 0 && address.length > 0) {
            // Return a Promise to the Caller
            return new Promise((resolve, reject) => {
                // FIXME: Async flag should be a configurable option
                request.open(method, address, true);

                // For all the headers, add them to the request
                for(const header in settings.headers) {
                    let content = headers[header];
                    // Add the Header
                    request.setRequestHeader(header, content);
                }

                // Define when to call resolve and when to call reject
                request.onload = function() {
                    const response = request.responseText;
                    resolve(response);
                };

                request.onerror = function() {
                    const response = request.responseText;
                    reject(response);
                }

                // Send the request!
                request.send();
            });
        }
    }
}

export function setup(options) {
    // TODO: Allow the setup for all default requests
    for(const option in options) {
        settings[option] = options[option];
    }

    // Show what we're using as our default settings for all requests
    return settings;
}

export function get(url, options) {
    if(url.length > 0) {
        return new Request({
            method : 'GET',
            address : url,
            options : options
        });
    } else {
        return false;
    }
}
