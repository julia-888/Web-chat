/* База данных содержит одну таблицу, которая заполняется сообщениями */

-- Table: chat.messages

-- DROP TABLE IF EXISTS chat.messages;

CREATE TABLE IF NOT EXISTS chat.messages
(
    id_of_message bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    text_of_message text COLLATE pg_catalog."default",
    sender_name text COLLATE pg_catalog."default",
    time_of_sending text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT messages_pkey PRIMARY KEY (id_of_message)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS chat.messages
    OWNER to postgres;