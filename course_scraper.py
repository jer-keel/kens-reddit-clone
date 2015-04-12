import datetime, urllib2
from pymongo import MongoClient
from bs4 import BeautifulSoup

prof = {
  "lastname": "Keeler",
  "firstname": "Calvin",
  "email": "ckeeler",
  "date": datetime.datetime.utcnow()
}

base_url = "https://udapps.nss.udel.edu/CoursesSearch/search-results?&term=2158&search_type=A&text_info=All&credit=Any&session=1&instrtn_mode=All&startat=2158"

def gen_url(start_class):
  return base_url + start_class

def get_courses(start_class):
  response = urllib2.urlopen(gen_url(start_class))
  soup = BeautifulSoup(response.read())
  soup.prettify()
  something = soup.find_all("a", {"class": "coursenum"})
  last = start_class
  for thing in something:
    print thing.text
    last = thing.text
    print thing.get("href")
  return last

temp = "ACCT413012"
for i in range(10):
  temp = get_courses(temp)

client = MongoClient("mongodb://localhost/")
db = client.professors
profs = db.profs
# prof_id = profs.insert_one(prof)
# print prof_id
# print db.collection_names(include_system_collections=False)
