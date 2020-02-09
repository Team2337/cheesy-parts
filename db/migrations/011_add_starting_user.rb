require "pathological"

Sequel.migration do
  up do
    require_relative "../../models/user"

    user = User.new(:email => "deleteme@team254.com", :first_name => "Delete", :last_name => "Me",
                    :permission => "admin", :enabled => 1)
    user.set_password("chezypofs")
    user.save
  end

  down do
    require_relative "../../models/user"

    User[:email => "deleteme@team254.com"].delete rescue nil
  end
end
