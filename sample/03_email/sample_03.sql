DROP TABLE IF EXISTS r_person_email_auth;
DROP TABLE IF EXISTS r_person_authtype;
DROP TABLE IF EXISTS e_authtype;
DROP TABLE IF EXISTS e_person;
DROP TABLE IF EXISTS e_email_auth;

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

CREATE TABLE e_email_auth (
  id int UNSIGNED NOT NULL AUTO_INCREMENT,
  Value varchar(255) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE INDEX UQ_email_auth_value (Value)
);

CREATE TABLE r_person_authtype (
  id int UNSIGNED NOT NULL AUTO_INCREMENT,
  person int UNSIGNED DEFAULT NULL,
  authtype int UNSIGNED NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT FK_person_authtype_person_id FOREIGN KEY (person)
  REFERENCES e_person (id) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT FK_person_authtype_id FOREIGN KEY (authtype)
  REFERENCES e_authtype (id) ON DELETE RESTRICT ON UPDATE RESTRICT
);

CREATE TABLE r_person_email_auth (
  id int UNSIGNED NOT NULL AUTO_INCREMENT,
  person int UNSIGNED DEFAULT NULL,
  email_auth int UNSIGNED NOT NULL,
  PRIMARY KEY (id),
  UNIQUE INDEX UQ_r_person_email_auth_email_auth (email_auth),
  CONSTRAINT FK_person_email_auth_person_id FOREIGN KEY (person)
  REFERENCES e_person (id) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT FK_person_email_auth_email_auth_id FOREIGN KEY (email_auth)
  REFERENCES e_email_auth (id) ON DELETE RESTRICT ON UPDATE RESTRICT
);

INSERT INTO e_person (id, NameFirst, NameLast) VALUES (1, 'Alex', 'Gusev');
INSERT INTO e_authtype (id, Value) VALUES (1, 'by email');
INSERT INTO e_email_auth (id, Value) VALUES (1, 'alex@flancer.lv');
INSERT INTO e_email_auth (id, Value) VALUES (2, 'info@flancer.lv');
INSERT INTO r_person_authtype (id, person, authtype) VALUES (1, 1, 1);
INSERT INTO r_person_email_auth (id, person, email_auth) VALUES (1, 1, 1);
INSERT INTO r_person_email_auth (id, person, email_auth) VALUES (2, 1, 2);