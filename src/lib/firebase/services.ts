import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import app from "./init";
import bcrypt from "bcrypt";

const firestore = getFirestore(app);

export async function retrieveData(collectionName: string) {
  const querySnapshot = await getDocs(collection(firestore, collectionName));
  const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return data;
}

export async function retrieveDataById(collectionName: string, id: string) {
  // const q = query(collection(firestore, "distributors"), where("id", "==", id));
  // const snapshot = await getDocs(q);
  // const users = snapshot.docs.map((doc) => ({
  //   id: doc.id,
  //   ...doc.data(),
  // }));
  // return users[0];
  const querySnapshot = await getDoc(doc(firestore, collectionName, id));
  const data = querySnapshot.data();
  return data;
}

export async function register(data: {
  fullname: string;
  email: string;
  password: string;
  role?: string;
}) {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", data.email)
  );
  const snapshot = await getDocs(q);
  const users = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (users.length > 0) {
    return { status: false, statusCode: 400, message: "Email already exists" };
  } else {
    data.role = "admin";
    data.password = await bcrypt.hash(data.password, 10);

    try {
      await addDoc(collection(firestore, "users"), data);
      return { status: true, statusCode: 200, message: "Register Success" };
    } catch (error) {
      return { status: false, statusCode: 400, message: "Register Failed" };
    }
  }
}

export async function login(data: { email: string }) {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", data.email)
  );
  const snapshot = await getDocs(q);
  const users = snapshot.docs.map((doc: any) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (users.length > 0) {
    const user = users[0];
    return user;
  } else {
    return null;
  }
}

// export async function login(data: { email: string; password: string }) {
//   const q = query(
//     collection(firestore, "users"),
//     where("email", "==", data.email)
//   );
//   const snapshot = await getDocs(q);
//   const users = snapshot.docs.map((doc: any) => ({
//     id: doc.id,
//     ...doc.data(),
//   }));
//   if (users.length > 0) {
//     const user = users[0];
//     const isMatch = await bcrypt.compare(data.password, user.password);
//     if (isMatch) {
//       return { status: true, statusCode: 200, message: "Login Success!" };
//     } else {
//       return { status: false, statusCode: 400, message: "Invalid password!" };
//     }
//   } else {
//     return { status: false, statusCode: 400, message: "Invalid email!" };
//   }
// }

export async function loginWithGoogle(data: any, callback: any) {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", data.email)
  );
  const snapshot = await getDocs(q);
  const users = snapshot.docs.map((doc: any) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (users.length > 0) {
    data.role = users[0].role;
    await updateDoc(doc(firestore, "users", users[0].id), data).then(() => {
      callback({ status: true, data: data });
    });
  } else {
    data.role = "admin";
    await addDoc(collection(firestore, "users"), data).then(() => {
      callback({ status: true, data: data });
    });
  }
}

// product
export async function addDistributor(data: {
  name: string;
  city: string;
  country: string;
  email: string;
  phone: string;
  state: string;
  id: string;
}) {
  try {
    await setDoc(doc(firestore, "distributors", data.id), data);
    return {
      status: true,
      statusCode: 200,
      message: "Data Berhasil Ditambahkan",
    };
  } catch (error) {
    return {
      status: false,
      statusCode: 400,
      message: "Data Gagal Ditambahkan",
    };
  }
}

export async function editDistributor(data: {
  name: string;
  city: string;
  country: string;
  email: string;
  phone: number;
  state: string;
  id: string;
}) {
  const q = query(
    collection(firestore, "distributors"),
    where("id", "==", data.id)
  );
  const snapshot = await getDocs(q);
  const users = snapshot.docs.map((doc: any) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (users.length > 0) {
    await updateDoc(doc(firestore, "distributors", users[0].id), data);
    return {
      status: true,
      statusCode: 200,
      message: "Data Berhasil Diupdate",
    };
  } else {
    return {
      status: false,
      statusCode: 400,
      message: "Data Gagal Diupdate",
    };
  }
}

export async function uploadBean(data: {
  author: string;
  id: string;
  file: string;
  title: string;
}) {
  try {
    await setDoc(doc(firestore, "uploadBean", data.id), data);
    return {
      status: true,
      statusCode: 200,
      message: "Data Berhasil Ditambahkan",
    };
  } catch (error) {
    return {
      status: false,
      statusCode: 400,
      message: "Data Gagal Ditambahkan",
    };
  }
}
