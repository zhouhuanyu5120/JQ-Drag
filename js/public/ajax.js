class HttpRequest{
    constructor(){}

    get(url){
        return new Promise((resolve, reject) => {
            $.ajax({
                type: 'GET',
                url: url,
                dataType: "json",
                success: function(res) { 
                    resolve(res)
                }
             })
        });
    }

    post(url,data={}){
        return new Promise((resolve, reject) => {
            $.ajax({
                type: 'POST',
                url: url,
                data: data,
                dataType: "json",
                success: function(res) { 
                    resolve(res)
                }
             })
        });
    }
}

const Http = new HttpRequest()