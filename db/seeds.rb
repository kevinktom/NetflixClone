# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'open-uri'

User.destroy_all
Video.destroy_all

testUser = User.create(email: "hire@me.please", password:"password")
# testUser2 = User.create(email: "demo@demo.com", password:"password")
# testvideo = Video.create!(title: "Chickens!", description: "Look at all those chickens!", year: 2019 , maturity_rating: "PG13", runtime: "43", video_type: "video")
# testvideo.video_url.attach(io: File.open("/Users/kevintom/Documents/lookchickens.mp4"), filename:"lookchickens.mp4")

# theoffice = Video.create!(title: "The Office", description: "Imitation is the sincerest form of flattery.", year: 2013, maturity_rating: "PG13", runtime: "1 Minute 27 Seconds", video_type: "video")
# theoffice.video_url.attach(io: open('https://tomflix-dev.s3.amazonaws.com/theoffice.mp4'), filename: 'theoffice.mp4')
# theoffice.photo.attach(io: open('https://tomflix-dev.s3.amazonaws.com/theoffice.jpg'), filename: 'theoffice.jpg')

theoffice = Video.create!(title: "The Office", description: "Imitation is the sincerest form of flattery.", year: 2013, maturity_rating: "PG13", runtime: "1 Minute 27 Seconds", video_type: "video")
theoffice.video_url.attach(io: open('https://tomflix-seeds.s3.amazonaws.com/seedtheoffice.mp4'), filename: 'seedtheoffice.mp4')
theoffice.photo.attach(io: open('https://tomflix-seeds.s3.amazonaws.com/theoffice.jpg'), filename: 'theoffice.jpg')