local dap = require('dap')

dap.configurations.typescriptreact = {
    {
        name = "Client",
        type = "chrome",
        request = "launch",
        url = "http://localhost:3000",
        webRoot = "${workspaceFolder}/src",
        sourceMaps = true
    }
}
