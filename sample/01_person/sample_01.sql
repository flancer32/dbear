DROP TABLE IF EXISTS person;
CREATE TABLE person (
  id int UNSIGNED NOT NULL AUTO_INCREMENT,
  NameFirst varchar(255) NOT NULL,
  NameLast varchar(255) NOT NULL,
  PRIMARY KEY (id)
);