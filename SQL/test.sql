# 6. For all cases where the same reviewer rated the same movie twice and gave it a higher rating the second time,
# return the reviewers name and the title of the movie.

select m.title, re.name
from (
select rId, mID, count(mID) as vote_count, max(stars) as max_star, max(ratingDate) as max_rating_date
from Rating
group by rId, mID
having vote_count = 2
) r1
join Rating r2
join Movie m
join Reviewer re
on r1.rID=r2.rID and r1.mID = r2.mID and re.rID = r2.rID and m.mID=r2.mID
where r2.stars = r1.max_star and  r2.ratingDate = r1.max_rating_date

# 7. For each movie, return the title and the 'rating spread', that is,
# the difference between highest and lowest ratings given to that movie.
# Sort by rating spread from highest to lowest, then by movie title.

select m.title, r.spread as sp
from (
	select mID, max(stars) - min(stars) as spread
	from Rating r
	group by mID
) r
join Movie m
on m.mID = r.mID
order by sp desc


# 8. Find the names of reviewers for every director (one row per director with all reviewers)

SELECT m.director, GROUP_CONCAT(re.name SEPARATOR ', ')
FROM Rating r, Movie m, Reviewer re
where m.mID = r.mID and re.rId = r.rID
group by m.director
order by m.director desc
