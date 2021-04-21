//API

// 1: AFTER 2S get student roll no
// 2: AFTER 2S get student name and age
// 3: AFTER 2S get student gender

const getRollNo = () => {
    setTimeout(() => {
        console.log('API getting roll no');
        let roll_no = [1,2,3,4,5];
        console.log(roll_no);

        setTimeout((rollno) => {
            console.log('API getting name and age');
            const bioData = {
                name : "Abijot Gupta",
                age : 21,
            }
            console.log(rollno);
            console.log(bioData);

            setTimeout((name) => {
                console.log('API getting gender');  
                bioData.gender = 'M';
                console.log(bioData);
            }, 2000, bioData.name);


        }, 2000, roll_no[1]);
 

    }, 2000);
}
getRollNo();