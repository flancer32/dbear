DROP TABLE IF EXISTS r_person_authtype;
DROP TABLE IF EXISTS e_authtype;
DROP TABLE IF EXISTS e_person;

CREATE TABLE e_authtype (
  id int UNSIGNED NOT NULL AUTO_INCREMENT,
  Value varchar(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE e_person (
  id int UNSIGNED NOT NULL AUTO_INCREMENT,
  NameFirst varchar(255) NOT NULL,
  NameLast varchar(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE r_person_authtype (
  id int UNSIGNED NOT NULL AUTO_INCREMENT,
  person int UNSIGNED DEFAULT NULL,
  authtype int UNSIGNED NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT FK_person_authtype_person_id FOREIGN KEY (person)
  REFERENCES e_person (id) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT FK_person_authtype_authtype_id FOREIGN KEY (authtype)
  REFERENCES e_authtype (id) ON DELETE RESTRICT ON UPDATE RESTRICT
);