<?php

class Users extends CI_Model {

    public $user_id;
    protected $table = 'users';

    function __construct() {
        parent::__construct();
    }

    public function add_user_details($data = array()) {
        $return = $this->db->insert($this->table, $data);
        if ($return) {
            return $this->db->insert_id();
        } else {
            return FALSE;
        }
    }

    public function update($data = array()) {
        $this->db->update($this->table, $data, array('id' => $data['id']));
        if ($this->db->affected_rows() > 0) {
            return TRUE;
        } else {
            return FALSE;
        }
    }

    public function get_all_users() {
        $result = $this->db->select('*')
                ->from($this->table)
                ->get()
                ->result();
        return $result;
    }


    public function get_user_by_id($id) {
        $result = $this->db->select('*')
                ->from($this->table)
                ->where('id', $id)
                ->get()
                ->row();
        return $result;
    }
    public function get_user_by_email($email) {
        $result = $this->db->select('ou.*')
                ->from($this->table . ' as ou')
                ->where('ou.email', $email)
                ->get()
                ->row();
        return $result;
    }

    public function delete_user($id) {
        $this->db->where('id', $id)
                ->from($this->table)
                ->delete();
        if ($this->db->affected_rows() > 0) {
            return TRUE;
        } else {
            return FALSE;
        }
    }
}
