

export default async function getRandomDataFromAll() {
    const randomNum = getRandomNumber(0, 9999);
    let found = false;
    let attempt = 0;

    while (!found) {
        try {
            let querySnapshot;
            if (attempt % 2 === 0) {
                const q1 = query(collection(db, collectionRef), where("randomNum1", "<=", randomNum), orderBy("randomNum1", 'desc'), limit(1));
                querySnapshot = await getDocs(q1);
            } else {
                const q2 = query(collection(db, collectionRef), where("randomNum1", ">=", randomNum), orderBy("randomNum1", 'asc'), limit(1));
                querySnapshot = await getDocs(q2);
            }

            if (!querySnapshot.empty) {
                found = true;
                let dataObj;
                querySnapshot.forEach((doc) => {
                    dataObj = doc.data();
                    console.log(dataObj);
                });
                return dataObj;
            }
            attempt++;
        } catch (error) {
            console.error("쿼리 중 오류 발생:", error);
            break;
        }
    }
}