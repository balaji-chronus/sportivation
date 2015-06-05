json.(@user,  :id, :email, :created_at, :updated_at, :name,
              :displayname, :contactphone, :address, :summary, :dob, :gender)

json.user_tournaments @user.user_tournaments
