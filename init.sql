CREATE TABLE items(
    ID SERIAL PRIMARY KEY NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    colors TEXT,
    sizes TEXT,
    "originalPrice" INT,
    "salePrice" INT,
    liked BOOLEAN,
    "inStock" INT
  );

  CREATE TABLE reviews(
    ID SERIAL PRIMARY KEY NOT NULL,
    prodId INT REFERENCES items (ID),
    "easeOfAssembly" INT,
    "valueForMoney" INT,
    "productQuality" INT,
    appearance INT,
    "worksAsExpected" INT,
    "overallRating" INT,
    "createdAt" TEXT,
    "iRecommendThisProduct" BOOLEAN,
    header TEXT,
    body TEXT
  );


