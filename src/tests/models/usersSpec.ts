import { User, usersModel } from "../../models/users";

const users = new usersModel ();

describe ("Users table: create user", () => {
    it ("create should return a user", async () => {
        const user: User = {firstName: 'Mohamed5', lastName: 'Moussa8', password: 'password'};
        const res = await users.createUser(user.firstName,user.lastName,user.password);
        expect(res).toBeDefined;
    })
})

describe ("Users table: authenticate user", () => {

    beforeAll(async () => {
        const user: User = {firstName: 'Mohamed4', lastName: 'Moussa7', password: 'password'};
        await users.createUser(user.firstName,user.lastName,user.password);
    });

    it ("authenticate a previously created user", async () => {
        const user: User = {firstName: 'Mohamed4', lastName: 'Moussa7', password: 'password'};
        const res = await users.authenticateUser(user.firstName,user.lastName,user.password);
        expect(res).toBeDefined();
    })

    it ("Index user table", async () => {
        const res = await users.index();
        expect(res.length).toBeGreaterThanOrEqual(1);
    })

    it ("Index user table", async () => {
        const res = await users.show(1);
        expect(res).toBeDefined;
    })

})