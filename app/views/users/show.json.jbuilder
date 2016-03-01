json.id @user.id

json.title do
  json.text do
    json.headline @user.email
  end
end
json.events @user.owend_journeys do |journey|
  # json.start_date journey.start_date
  json.start_date do
    json.year journey.start_date.strftime('%Y')
    json.month journey.start_date.strftime('%m')
    json.day journey.start_date.strftime('%d')

  end
  json.text do
    json.headline journey.title
  end
end
