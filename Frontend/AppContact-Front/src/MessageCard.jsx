import React from "react";
import { useNavigate } from "react-router-dom";

const MessageCard = function (props) {
    let navigate = useNavigate();

    const routeChange = function () {
        navigate(props.link);
    };

    return (
        <div className="container d-flex justify-content-center align-items-center mt-5">
            <div className="row w-50">
                <div className="col px-5 py-5 ">
                    <div className="card shadow">
                        <div className="card-body mb-3">
                            <div className="text-center">{props.message}</div>
                        </div>
                        <div className="row justify-content-center">
                            <button
                                className="btn btn-success w-50 mb-3"
                                onClick={routeChange}
                            >
                                login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessageCard;
