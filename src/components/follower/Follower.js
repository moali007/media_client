import React, { useEffect, useState } from "react";
import Avatar from "../avatar/Avatar";
import "./Follower.scss";
import { useDispatch, useSelector } from "react-redux";
import { followAndUnfollow } from "../../redux/slices/feedSlice";
import { useNavigate } from "react-router-dom";

function Follower({ user }) {
  const dispatch = useDispatch();
  const feedData = useSelector((state) => state.feedReducer.feedData);
  const [isFollowing, setIsFollowing] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (feedData.followings.find((item) => item._id === user._id)) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
    // setIsFollowing(feedData.followings.find(item=>item._id===user._id)) //same as above if else
  }, [feedData]);

  function handleUserFollow() {
    dispatch(
      followAndUnfollow({
        userIdToFollow: user._id,
      })
    );
  }

  return (
    <div>
      <div className="Follower">
        <div
          className="user-info"
          onClick={() => navigate(`/profile/${user._id}`)}
        >
          <Avatar src={user?.avatar?.url} />
          <h4 className="name">{user?.name}</h4>
        </div>
        <h5
          onClick={handleUserFollow}
          className={isFollowing ? "hover-link follow-link" : "btn-primary"}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </h5>
      </div>
    </div>
  );
}

export default Follower;
