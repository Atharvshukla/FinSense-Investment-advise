/*
  # FinSense AI Database Schema

  1. New Tables
    - `investment_strategies`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `risk_tolerance` (text)
      - `investment_horizon` (text)
      - `current_portfolio` (text)
      - `financial_goals` (text)
      - `strategy` (text)
      - `created_at` (timestamptz)
    - `financial_documents`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `title` (text)
      - `content` (text)
      - `embedding` (vector(1536))
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Enable pgvector extension for embeddings
CREATE EXTENSION IF NOT EXISTS vector;

-- Investment Strategies Table
CREATE TABLE IF NOT EXISTS investment_strategies (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users NOT NULL,
    risk_tolerance text NOT NULL,
    investment_horizon text NOT NULL,
    current_portfolio text,
    financial_goals text,
    strategy text NOT NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Financial Documents Table (for RAG implementation)
CREATE TABLE IF NOT EXISTS financial_documents (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    embedding vector(1536),
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE investment_strategies ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_documents ENABLE ROW LEVEL SECURITY;

-- Policies for investment_strategies
CREATE POLICY "Users can insert their own investment strategies"
    ON investment_strategies
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own investment strategies"
    ON investment_strategies
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own investment strategies"
    ON investment_strategies
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own investment strategies"
    ON investment_strategies
    FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);

-- Policies for financial_documents
CREATE POLICY "Users can insert their own documents"
    ON financial_documents
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own documents"
    ON financial_documents
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own documents"
    ON financial_documents
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own documents"
    ON financial_documents
    FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_investment_strategies_user_id ON investment_strategies(user_id);
CREATE INDEX IF NOT EXISTS idx_financial_documents_user_id ON financial_documents(user_id);
CREATE INDEX IF NOT EXISTS idx_financial_documents_embedding ON financial_documents USING ivfflat (embedding vector_cosine_ops);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_investment_strategies_updated_at
    BEFORE UPDATE ON investment_strategies
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_financial_documents_updated_at
    BEFORE UPDATE ON financial_documents
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();