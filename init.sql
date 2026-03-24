CREATE TABLE IF NOT EXISTS plc_data (
    id SERIAL PRIMARY KEY,
    round VARCHAR(50),
    date_str VARCHAR(255),
    teacher VARCHAR(255),
    position VARCHAR(255),
    std_name VARCHAR(255),
    age VARCHAR(50),
    room VARCHAR(255),
    disability TEXT,
    reg_yes BOOLEAN DEFAULT FALSE,
    reg_no BOOLEAN DEFAULT FALSE,
    dev1 TEXT,
    dev2 TEXT,
    dev3 TEXT,
    dev4 TEXT,
    dev5 TEXT,
    prob1 TEXT,
    prob2 TEXT,
    prob3 TEXT,
    want_dev TEXT,
    fund_no BOOLEAN DEFAULT FALSE,
    fund_yes BOOLEAN DEFAULT FALSE,
    fund_detail TEXT,
    family_analysis TEXT,
    other_analysis TEXT,
    expert_analysis TEXT,
    challenge_name TEXT,
    apply_use TEXT,
    sign_name VARCHAR(255),
    sign_full VARCHAR(255),
    sign_pos VARCHAR(255),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert an initial row if it's the first time
-- (In this simple case, we'll just update this one row or insert if not exists)
INSERT INTO
    plc_data (id)
VALUES
    (1) ON CONFLICT (id) DO NOTHING;