var app = angular.module('learnAngular', []).controller('addContactFormController', function ($scope, $http) {
    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8";
    $scope.contact = {};
    $scope.msg = null;
    $scope.errmsg = false;
    $scope.succesmsg = false;
    $scope.submtBtnValue = 'Add';
    $http({
        method: 'POST',
        url: base_url + 'contact/get_contacts'
    }).then(function (response) {
        $scope.contactList = response.data.contact_list;
    });
    $scope.onSubmit = function () {
        $http({
            method: 'POST',
            url: base_url + 'contact/add_update_contact',
            data: $.param($scope.contact)
        }).then(function (response) {
            if (response.data.errors) {
                $scope.errorName = response.data.errors.name;
                $scope.errorPhone = response.data.errors.phone;
                $scope.errorCompany = response.data.errors.company;
                $scope.errorAddress = response.data.errors.address;
                $scope.contactList = response.data.contact_list;
            } else {
                $scope.errorName = null;
                $scope.errorPhone = null;
                $scope.errorCompany = null;
                $scope.errorAddress = null;
                $scope.contact = {};
                $scope.errmsg = response.data.success ? false : true;
                $scope.succesmsg = response.data.success ? true : false;
                $scope.msg = response.data.msg;
                $scope.contactList = response.data.contact_list;
                $scope.submtBtnValue = 'Add';
            }
        });
    };
    $scope.editContact = function (obj) {
        $scope.submtBtnValue = 'Update';
        $scope.contact = obj;
        $scope.contact.phone = Number(obj.phone);
    };
    $scope.deleteContact = function (id) {
        $http({
            method: 'POST',
            url: base_url + 'contact/delete_contact',
            data: $.param({id: id})
        }).then(function (response) {
            $scope.errmsg = response.data.success ? false : true;
            $scope.succesmsg = response.data.success ? true : false;
            $scope.msg = response.data.msg;
            $scope.contactList = response.data.contact_list;
        });
    };
    $scope.formatDate = function (date) {
        var dateOut = new Date(date);
        return dateOut;
    };
});
app.controller('addBookController', function ($scope, $http) {
    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8";
    $scope.books = [{}];
    $scope.users = {};
    $scope.data = [];
    $scope.msg = null;
    $scope.errmsg = false;
    $scope.succesmsg = false;
    $scope.hideSubmitBtn = null;
    $scope.submtBtnValue = 'Add';
    $scope.formData = {};
    $scope.AddBookRow = function () {
        $scope.hideSubmitBtn = null;
        $scope.books.push({});
    };
    $scope.RemoveBookRow = function (i) {
        $scope.hideSubmitBtn = i;
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
    $scope.onSubmitBookForm = function () {
        $scope.data.push($scope.formData);
        $scope.data.push($scope.books);
        $http({
            method: 'POST',
            url: base_url + 'add_book/add_update',
            data: $scope.data
        }).then(function (response) {
            $scope.errmsg = response.data.success ? false : true;
            $scope.succesmsg = response.data.success ? true : false;
            $scope.msg = response.data.msg;
            $scope.userAllBookList = response.data.user_all_book_list;
            $scope.books = [{}];
            $scope.formData = null;
            $scope.submtBtnValue = 'Add';
        });
    };
    $scope.editUsersBook = function (obj) {
        $scope.submtBtnValue = 'Update';
        $scope.books = [obj];
        $scope.formData.user = {id:obj.user_id};
    };
    $scope.deleteUsersBook = function (obj) {
        $http({
            method: 'POST',
            url: base_url + 'add_book/delete_book',
            data: $.param({id: obj.id, user_id: obj.user_id})
        }).then(function (response) {
            $scope.errmsg = response.data.success ? false : true;
            $scope.succesmsg = response.data.success ? true : false;
            $scope.msg = response.data.msg;
            $scope.userAllBookList = response.data.books_list;
        });
    };
    $scope.formatDate = function (date) {
        var dateOut = new Date(date);
        return dateOut;
    };
});