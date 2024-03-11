import { Axios } from '../axios';


const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI2N2U4ZTMyNC1kMjc0LTQwNWYtYWExNS1kODcyYjk1ZDZhNmYiLCJlbWFpbCI6InZhcmlhYmxldmFyOUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiN2JmNzQzOWU5NzliNzc4MjExY2QiLCJzY29wZWRLZXlTZWNyZXQiOiI4Njk0MjA4Y2I0OTVmMmU0MzkzODhiMDNhMWJiNjZjMTAxMTc5NzVmYmQ3NjU4YTA5MzMxZDIyZTE3N2MwM2RlIiwiaWF0IjoxNzA5NzA5ODU4fQ.-1li736hDCIHRXX7N_fThIh_ja3GnVnTyWKegLbEECM';

export const pinJSONToIPFS = async(JSONBody) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    return Axios
        .post(url, JSONBody, {
            headers: {
                Authorization: `Bearer ${key}`,
            }
        })
        .then(function (response) {
           return {
               success: true,
               pinataUrl: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
           };
        })
        .catch(function (error) {
            console.log(error)
            return {
                success: false,
                message: error.message,
            }
           
        });
};


export const pinFileToIPFS = async(formdata) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    return Axios
        .post(url, formdata, {
            headers: {
                Authorization: `Bearer ${key}`,

            }
        })
        .then(function (response) {
           return {
               success: true,
               pinataUrl: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
           };
        })
        .catch(function (error) {
            console.log(error)
            return {
                success: false,
                message: error.message,
            }
           
        });
};