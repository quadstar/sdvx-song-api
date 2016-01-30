#  SDVX Song List API:

### About:
This API provides information of songs from sdvx titles.

### Urls:

/api/songs  
  
  - Returns a list of songs in the database.

/api/songs[/?field=value]
  
  - Returns a list of songs filtered by criteria 

####example: 
   - __/api/songs/?title=Dynasty__ 	
 	returns:

<pre>
[
  {
    "title": "Dynasty",
	"__v": 0,
	"_id": "566f1cbd7d7f63c3029030a8",
	"artist": "Yooh",
	"difficulty_cat": "EXH",
	"difficulty_level": 15,
	"difficulty_tier": -10,
	"game": "sdvx1"
  },
  {
	"title": "Dynasty",
	"__v": 0,
	"_id": "566f1e12bd92e7d2027e37e9",
	"artist": "Yooh",
	"difficulty_cat": "INF",
	"difficulty_level": 15,
	"difficulty_tier": 5,
	"game": "sdvx1"
  }
]
</pre>

####You can chain multiple selectors with '&'

- __/api/songs/?title=Dynasty&difficulty_cat=INF__ 	

	returns:

<pre>
[
  {
	"title": "Dynasty",
	"__v": 0,
	"_id": "566f1e12bd92e7d2027e37e9",
	"artist": "Yooh",
	"difficulty_cat": "INF",
	"difficulty_level": 15,
	"difficulty_tier": 5,
	"game": "sdvx1"
  }
]
</pre>




### List of fields:
- game (sdvx1, sdvx2, sdvx3)
- title (song title)
- artist 
- difficulty_level (1-16)
- difficulty_cat (NOV, ADV, EXH, INF, GRV)
- difficulty_ tier (https://pbs.twimg.com/media/CVw_Dw9XIAABxFv.png) only supported for 15+
- limit - specifies how many results to return (default 10)

### TODO:
- Return banner images
- Add complete difficulty_tier data
- Add multiple filtering e.g 12-15 returns all songs of difficulties 12,13,14,15
- Add batch update functionality.


