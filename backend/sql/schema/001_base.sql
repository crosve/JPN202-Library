-- +goose Up
CREATE TABLE grammar (
    grammarId UUID PRIMARY KEY, 
    grammarTopic TEXT NOT NULL, 
    examples JSONB NOT NULL,
    pageRefrence TEXT
);

-- +goose Down
DROP TABLE grammar; 