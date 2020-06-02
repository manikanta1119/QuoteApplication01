var app = angular.module("myApp", []);
app.controller("myCtrl", function ($scope, $http) {

    
    $scope.InsertData = function () {
        var Action = document.getElementById("btnSave").getAttribute("value");

        if (Action == "Submit") {
            $scope.quote = {};
            $scope.quote.Id = $scope.Id;
            $scope.quote.Quote1 = $scope.Quote1;
            $scope.quote.Author = $scope.QuoteAuthor;
            $scope.quote.Tags = $scope.QuoteTags;
            $scope.quote.Resource = $scope.QuoteResource;
            $scope.quote.Agenda = $scope.QuoteAgenda;

            $http({
                method: "post",
                url: "http://localhost:57436/QuoteGenerate/Insert_quote",
                datatype: "json",
                data: JSON.stringify($scope.quote)
            }).then(function (response) {
                alert(response.data);
                $scope.GetAllData();
                $scope.Id = "";
                $scope.Quote1 = "";
                $scope.QuoteAuthor = "";
                $scope.QuoteResource = "";
                $scope.QuoteTags = "";
                $scope.QuoteAgenda = "";

            })
        } else {
            $scope.quote = {};
            $scope.quote.Quote1 = $scope.Quote1;
            $scope.quote.Author = $scope.QuoteAuthor;
            $scope.quote.Tags = $scope.QuoteTags;
            $scope.quote.Resource = $scope.QuoteResource;
            $scope.quote.Agenda = $scope.QuoteAgenda;
            $scope.quote.Id = document.getElementById("Id").value;
            $http({
                method: "post",
                url: "http://localhost:57436/QuoteGenerate/Update_Quote ",
                datatype: "json",
                data: JSON.stringify($scope.quote)
            }).then(function (response) {
                alert(response.data); 
                $scope.GetAllData(); 
                //$scope.Quote1 = "";
                //$scope.QuoteAuthor = "";
                //$scope.QuoteResource = "";
                //$scope.QuoteTags = "";
                //$scope.QuoteAgenda = "";
                document.getElementById("btnSave").setAttribute("value", "Submit");
                document.getElementById("btnSave").style.backgroundColor = "cornflowerblue";
                document.getElementById("spn").innerHTML = "Add New Quote"; 
            })

        }
    }
    $scope.GetAllData = function () {
        $http({
            method: "POST",
            url: "http://localhost:57436/QuoteGenerate/GetQuotes",
            datatype: 'json',
            headers: { "Content-Type": "application/json" }
            
            
        }).then(function (responce) {
            $scope.quotes = responce.data;
            console.log(response.data);
           
        }), function () {
            alert("Error Occur")
        }
    };
    
    $scope.Deletequote = function (quote) {

        $http({
            method: "post",
            url: "http://localhost:57436/QuoteGenerate/Delete_Quote",
            datatype: "json",
            
            data: JSON.stringify(quote)
        }).then(function (response) {
            alert(response.data);
            $scope.GetAllData();
        })
    };
    $scope.Updatequote = function (quote) {
        document.getElementById("Id").value = quote.Id;
        $scope.Id = quote.Id;
        $scope.Quote1 = quote.Quote1;
        $scope.Author = quote.Author;
        $scope.Tags = quote.Tags;
        $scope.Resource = quote.Resource;
        $scope.Agenda = quote.Agenda;
        document.getElementById("btnSave").setAttribute("value", "Update");
        document.getElementById("btnSave").style.backgroundColor = "Yellow";
        document.getElementById("spn").innerHTML = "Update Quote Information";
    }  

    $scope.reloadRoute = function () {
        location.reload();
    }

    $scope.Website = function (url) {
        window.open(url,'_blank')
    }

    
})
