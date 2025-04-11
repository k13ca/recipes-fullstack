const createRecipesTable = `
      CREATE TABLE IF NOT EXISTS recipes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        external BOOLEAN,
        external_id INT,
        name VARCHAR(36) NOT NULL,
        calories_per_serving INT,
        cook_time_minutes INT,
        prep_time_minutes INT,
        cuisine VARCHAR(100),
        difficulty ENUM('Easy', 'Medium', 'Hard'),
        image TEXT,
        servings INT,
        ingredients JSON,
        instructions JSON ,
        meal_type JSON NOT NULL,
        tags JSON NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

module.exports = {
  createRecipesTable,
};
