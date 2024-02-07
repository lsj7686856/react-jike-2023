import {useEffect, useState} from "react";
import request from "@/utils/request";

function useGetChannels() {
    const [channelList, setChannelList] = useState([])
    useEffect(() => {
        const getChannels = async () => {
            try {
                const result = await request.get('/channels')
                setChannelList(result.data.channels ?? [])
            } catch (e) {

            }
        }
        getChannels()
    }, []);
    return [channelList, setChannelList]
}

export {useGetChannels}