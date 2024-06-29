// UserService.ts
interface UserData {
    id: string;
    point: string;
    reserve: string;
    gamePlayToday: boolean;
    gameCount: number;
}

interface ApiResponse {
    result_code: number;
    data: UserData[];
}

export default class UserService {
    private userData: UserData | null = null;
    private resultCode: number | null = null;
    private remainTry: number | null = null;

    constructor() {}

    // 데이터를 저장하는 함수
    public saveUserData(response: ApiResponse): void {
        if (response.result_code === 200 && response.data.length > 0) {
            this.resultCode = response.result_code;
            this.userData = response.data[0];
            this.remainTry = Math.abs(this.userData.gameCount - 3);
            console.log(this.remainTry)
            console.log("User data saved successfully.");
        } else {
            console.error("Failed to save user data.");
        }
    }

    // 저장된 데이터를 가져오는 함수 (옵션)
    public getUserData(): UserData | null {
        return this.userData;
    }

    public getResultCode(): number | null {
        return this.resultCode;
    }

    public getRemainTry(): number | null{
        return this.remainTry;
    }

    private apiUrl: string = 'http://localhost:8080/api';  // API 엔드포인트 URL

    public async ApiRequest(userId: string): Promise<UserData | null> {
        const requestData = {
            userId: userId
        };

        const requestOptions: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        };
        try {
            const response = await fetch(`${this.apiUrl+ '/users'}`, requestOptions);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data: ApiResponse = await response.json();
            if (data.result_code !== 200) {
                throw new Error(`API returned error code: ${data.result_code}`);
            }

            // API에서 받은 첫 번째 사용자 데이터를 반환
            this.saveUserData(data);
            return null;
        } catch (error) {
            console.error('Fetch Error:', error);
            return null;
        }
    }

    public async getPointAndStop(userId : string){
        const requestData = {
            userid : userId,
            content:'게임 플레이 보상'
        }

        const requestOptions: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        };

        try {
            const response = await fetch(`${this.apiUrl+ '/point/get-points'}`, requestOptions);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result:ApiResponse = await response.json();
            if(result.result_code == -1){
                console.log("이미 지급이 된 상태입니다.");
                return;
            }

            console.log("포인트 지급 완료");
            return null;
        } catch (error) {
            console.error('Fetch Error:', error);
            return null;
        }
    }

    public async StartGame(userId: string){
        const requestData = {
            userId : userId
        }

        const requestOptions: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        };

        try {
            const response = await fetch(`${this.apiUrl+ '/game/start/game'}`, requestOptions);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            console.log(response);
            return null;
        } catch (error) {
            console.error('Fetch Error:', error);
            return null;
        }
    }

    public async endGame(userId:string, score:number){
        const requestData = {
            id : userId,
            score : score
        }

        const requestOptions: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        };

        try {
            const response = await fetch(`${this.apiUrl+ '/game/finish/game'}`, requestOptions);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            console.log("게임 종료");
            return null;
        } catch (error) {
            console.error('Fetch Error:', error);
            return null;
        }
    }

    public async reStartGame(userId:string){

    }
}
