<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Add_book extends CI_Controller {

    function __construct() {
        parent::__construct();
//        $this->load->model('contacts', '', TRUE);
        $this->load->model('users', '', TRUE);
    }

    public function index() {
        $data = array();
        $data['title'] = 'Welcome to contact Management';
        $data['dashboard_title'] = 'Welcome to contact Management';
        $data['user_email'] = $this->session->userdata('email');
        $data['user_id'] = $uid = $this->session->userdata('uid');
        $data['user_list'] = $this->users->get_all_users();


        $this->load->view('contact_list/header', $data);
        $this->load->view('add_book/add_book_view');
        $this->load->view('contact_list/footer');
    }

    public function add() {
            $form_data = json_decode(file_get_contents("php://input"));
            $return = array();
            $add_book_data = array();
            $add_book_data_arr = array();
            $user_deatails = (isset($form_data) && isset($form_data[0]) && !empty($form_data[0]) && isset($form_data[0]->user) && !empty($form_data[0]->user) ? $form_data[0]->user : '');
            $books = (isset($form_data) && isset($form_data[1]) && !empty($form_data[1])  ? $form_data[1] : '');
            $count = (!empty($books) ? count($books) : '');
            $user_id = (!empty($user_deatails) ? $user_deatails->id : '');
            for ($i = 0; $i < $count; $i++) {
                $add_book_data['name'] = (isset($books[$i]->name) && !empty($books[$i]->name) ? $books[$i]->name : '');
                $add_book_data['isbn'] = (isset($books[$i]->isbn) && !empty($books[$i]->isbn) ? $books[$i]->isbn : '');
                $add_book_data['author'] = (isset($books[$i]->author) && !empty($books[$i]->author) ? $books[$i]->author : '');
                $add_book_data['user_id'] = (isset($user_id) && !empty($user_id) ? $user_id : '');
                $add_book_data['created_on'] = date('Y-m-d H:i:s');
                $add_book_data_arr[] = $add_book_data;
            }
            $result = add_multiple_data('books', $add_book_data_arr);
            $user_all_book_list = get_all_book_from_book_table_by_user_id($user_id);
            if ($result) {
                $return['user_all_book_list'] = $user_all_book_list;
                $return['msg'] = 'Data added successfully !';
            } else {
                $return['user_all_book_list'] = $user_all_book_list;
                $return['msg'] = 'Data added successfully !';
            }
            echo json_encode($return);
    }
    public function get_users(){
        $return = array();
        $users_list = get_all_data_from_table('users');
        $return['users_list'] = $users_list;
        echo json_encode($return);
    }
    public function get_books(){
        $return = array();
        $books_list = get_all_data_from_table('books');
        $return['books_list'] = $books_list;
        echo json_encode($return);
    }
}
