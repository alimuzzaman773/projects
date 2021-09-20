var app = angular.module('addContact', []).controller('addContactFormController', function ($scope, $http) {
    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8";
    $scope.contact = {};
    $scope.msg = null;
    $http({
        method: 'POST',
        url: base_url + 'contact/get_contacts'
    }).then(function (response) {
        $scope.contactList = response.data.contact_list;
    });
    $scope.addContact = function () {
        $http({
            method: 'POST',
            url: base_url + 'contact/add_contact',
            data: $.param($scope.contact)
        }).then(function (response) {
            if (response.data.errors) {
                $scope.errorName = response.data.errors.name;
                $scope.errorPhone = response.data.errors.phone;
                $scope.errorCompany = response.data.errors.company;
                $scope.errorAddress = response.data.errors.address;
                $scope.contactList = response.data.contact_list;
                $scope.msg = null;
            } else {
                $scope.errorName = null;
                $scope.errorPhone = null;
                $scope.errorCompany = null;
                $scope.errorAddress = null;
                $scope.contact = {};
                $scope.msg = response.data.msg;
                $scope.contactList = response.data.contact_list;
            }
        });
    };
    $scope.formatDate = function (date) {
        var dateOut = new Date(date);
        return dateOut;
    };
});
var app = angular.module('addBookApp', []).controller('addBookController', function ($scope, $http) {
    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8";
    $scope.books = [{}];
    $scope.users = {};
    $scope.data = [];
    $scope.msg = null;
    $scope.hideSubmitBtn = true;
    $scope.AddBookRow = function () {
        $scope.hideSubmitBtn = true;
        $scope.books.push({});
    };
    $scope.RemoveBookRow = function (i) {
        if (i === 0) {
            $scope.hideSubmitBtn = false;
        }
        $scope.books.splice(i, 1);
    };
    $http({
        method: 'POST',
        url: base_url + 'add_book/get_users'
    }).then(function (response) {
        $scope.users = response.data.users_list;
    });
    $http({
        method: 'POST',
        url: base_url + 'add_book/get_books'
    }).then(function (response) {
        $scope.userAllBookList = response.data.books_list;
    });
    $scope.AddBook = function () {
        $scope.data.push($scope.formData);
        $scope.data.push($scope.books);
        $http({
            method: 'POST',
            url: base_url + 'add_book/add',
            data: $scope.data
        }).then(function (response) {
            $scope.msg = response.data.msg;
            $scope.userAllBookList = response.data.user_all_book_list;
            $scope.books = [{}];
            $scope.formData = null;
        });
    };
    $scope.formatDate = function (date) {
        var dateOut = new Date(date);
        return dateOut;
    };
});