Sequel.migration do
  change do
    alter_table(:parts) do
      add_column :revision, Integer, :null => false, :default => 1
    end
  end
end
  