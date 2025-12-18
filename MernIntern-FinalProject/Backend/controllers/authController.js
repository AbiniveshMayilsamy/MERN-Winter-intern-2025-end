const users = [];

exports.register = (req, res) => {
  const { name, email, password, rollNo, className, role } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const user = {
    id: Date.now().toString(),
    name,
    email,
    password,
    rollNo,
    className,
    role: role || "student",
    createdAt: new Date()
  };

  users.push(user);
  res.status(201).json({ message: "User registered successfully", user });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.status(200).json({ message: "Login successful", user });
};

exports.getUsers = (req, res) => {
  res.status(200).json(users);
};
