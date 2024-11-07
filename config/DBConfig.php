<?php
namespace config;
use PDO;
use PDOException;

class DBConfig{
    private $dbhost;
    private $dbname;
    private $username;
    private $password;
    private $conn;

    public function __construct(){
        $this->dbhost="localhost";
        $this->dbname="fileMani";
        $this->username="root";
        $this->password="admin";
    }

    public function getConnection(){
        try {
            $this->conn = new PDO("mysql:host=$this->dbhost;dbname=$this->dbname",$this->username,$this->password);
            return $this->conn;
        } catch (PDOException $e) {
            return $e->getMessage();
        }
    }
}

?>