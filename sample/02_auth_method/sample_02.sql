DROP TABLE IF EXISTS r_person_authmethod;
DROP TABLE IF EXISTS e_authmethod;
DROP TABLE IF EXISTS e_person;

CREATE TABLE e_authmethod (
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

CREATE TABLE r_person_authmethod (
  id int UNSIGNED NOT NULL AUTO_INCREMENT,
  person int UNSIGNED DEFAULT NULL,
  authmethod int UNSIGNED NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT FK_person_authmethod_person_id FOREIGN KEY (person)
  REFERENCES e_person (id) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT FK_person_authmethod_authmethod_id FOREIGN KEY (authmethod)
  REFERENCES e_authmethod (id) ON DELETE RESTRICT ON UPDATE RESTRICT
);