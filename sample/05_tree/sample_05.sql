DROP TABLE IF EXISTS r_person_email_auth;
DROP TABLE IF EXISTS r_person_phone_auth;
DROP TABLE IF EXISTS r_person_authtype;
DROP TABLE IF EXISTS r_person_parent;
DROP TABLE IF EXISTS e_authtype;
DROP TABLE IF EXISTS e_person;
DROP TABLE IF EXISTS e_email;
DROP TABLE IF EXISTS e_phone;

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

CREATE TABLE e_email (
  id int UNSIGNED NOT NULL AUTO_INCREMENT,
  Value varchar(255) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE INDEX UQ_email_auth_value (Value)
);

CREATE TABLE e_phone (
  id int UNSIGNED NOT NULL AUTO_INCREMENT,
  Code varchar(255) NOT NULL,
  Number varchar(255) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE INDEX UQ_phone_code_number (Code, Number)
);

CREATE TABLE r_person_authtype (
  id int UNSIGNED NOT NULL AUTO_INCREMENT,
  person int UNSIGNED NOT NULL,
  authtype int UNSIGNED NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT FK_person_authtype_person_id FOREIGN KEY (person)
  REFERENCES e_person (id) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT FK_person_authtype_id FOREIGN KEY (authtype)
  REFERENCES e_authtype (id) ON DELETE RESTRICT ON UPDATE RESTRICT
);

CREATE TABLE r_person_email_auth (
  id int UNSIGNED NOT NULL AUTO_INCREMENT,
  person int UNSIGNED NOT NULL,
  email int UNSIGNED NOT NULL,
  PRIMARY KEY (id),
  UNIQUE INDEX UQ_r_person_email_auth_email_auth (email),
  CONSTRAINT FK_person_email_auth_person_id FOREIGN KEY (person)
  REFERENCES e_person (id) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT FK_person_email_auth_email_auth_id FOREIGN KEY (email)
  REFERENCES e_email (id) ON DELETE RESTRICT ON UPDATE RESTRICT
);

CREATE TABLE r_person_phone_auth (
  id int UNSIGNED NOT NULL AUTO_INCREMENT,
  person int UNSIGNED NOT NULL,
  phone int UNSIGNED NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT FK_person_phone_auth_person FOREIGN KEY (person)
  REFERENCES e_person (id) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT FK_person_phone_auth_phone FOREIGN KEY (phone)
  REFERENCES e_phone (id) ON DELETE RESTRICT ON UPDATE RESTRICT
);


CREATE TABLE r_person_parent (
  id int UNSIGNED NOT NULL AUTO_INCREMENT,
  person int UNSIGNED NOT NULL,
  parent int UNSIGNED NOT NULL,
  PRIMARY KEY (id),
  UNIQUE INDEX UQ_r_person_parent_person (person),
  CONSTRAINT FK_r_person_parent_person FOREIGN KEY (person)
  REFERENCES e_person (id) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT FK_r_person_parent_parent FOREIGN KEY (parent)
  REFERENCES e_person (id) ON DELETE RESTRICT ON UPDATE RESTRICT
);

INSERT INTO e_person (id, NameFirst, NameLast) VALUES (1, 'Alex', 'Gusev');
INSERT INTO e_person (id, NameFirst, NameLast) VALUES (2, 'Viktor', 'Gusev');
INSERT INTO e_authtype (id, Value) VALUES (1, 'by email');
INSERT INTO e_authtype (id, Value) VALUES (2, 'by phone');
INSERT INTO e_email (id, Value) VALUES (1, 'alex@flancer.lv');
INSERT INTO e_email (id, Value) VALUES (2, 'viktor@flancer.lv');
INSERT INTO e_phone (id, Code, Number) VALUES (1, '371', '29181801');
INSERT INTO e_phone (id, Code, Number) VALUES (2, '371', '29283383');
INSERT INTO r_person_authtype (id, person, authtype) VALUES (1, 1, 1);
INSERT INTO r_person_authtype (id, person, authtype) VALUES (2, 1, 2);
INSERT INTO r_person_email_auth (id, person, email) VALUES (1, 1, 1);
INSERT INTO r_person_email_auth (id, person, email) VALUES (2, 1, 2);
INSERT INTO r_person_phone_auth (id, person, phone) VALUES (1, 1, 1);
INSERT INTO r_person_phone_auth (id, person, phone) VALUES (2, 1, 2);
INSERT INTO r_person_parent (id, person, parent) VALUES (1, 1, 1);
INSERT INTO r_person_parent (id, person, parent) VALUES (2, 2, 1);
