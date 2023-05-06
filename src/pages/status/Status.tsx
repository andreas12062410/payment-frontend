import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import ProgressBar  from "../../component/progress-bar/ProgressBar";
import { fetchProjectStatusData } from "../../helper";

function Status(){
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
        const response = await fetchProjectStatusData();
        const responseData = await response;
        const data = responseData.data;
        setData(data);
        };
        fetchData();
    }, []);
    return(
        <div>
            <Typography fontSize="60px" textAlign="center" variant="h1" color="#ffffff">
            Projects{"  "}
            <Typography
                fontWeight="500"
                display="inline"
                fontSize="60px"
                color="#00A99D"
            >
                Status
            </Typography>
            </Typography>

            { data ? (
                <div>
            {Object.keys(data).map((key: any) => (
                <div>
                    <Typography key={key}
                        fontWeight="200"
                        display="inline"
                        fontSize="20px"
                        color="#00A99D"
                    >
                {key}
            </Typography>
                    <ProgressBar 
                        value={data[key]}
                        type="Progress"
                        status={"open"}
                        index={0}
                    />
                </div>
            ))}
            </div>
            ) : (
                <div>
                <Typography 
                    fontWeight="200"
                    display="inline"
                    fontSize="20px"
                    color="#00A99D"
                >
                "Nothing to show"
                </Typography>
                </div>
            )}

        </div>
    )
}

export default Status;