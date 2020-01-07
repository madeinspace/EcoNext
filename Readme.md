After adding a page to the build, get to the prod server (212 and 85) and add the page alias to the rewrite rule in the applicationHost.config file (C:\Windows\System32\inetsrv\config\):

<rewrite>
    <globalRules>
        <rule name="ARR_server_proxy" enabled="true" patternSyntax="ECMAScript" stopProcessing="true">
            <match url="\/?([^\/]+)\/(population|gross-product|workers-field-of-qualification)\/?" />
            <action type="Rewrite" url="https://econext.azurewebsites.net/{R:0}" />
            <conditions>
                <add input="{HTTP_HOST}" pattern="economy\." />
                <add input="{R:1}" pattern="^rda-" negate="true" />
                <add input="{R:1}" pattern="roc$" negate="true" />
                <add input="{R:1}" pattern="tasmania" negate="true" />
            </conditions>
        </rule>
    </globalRules>
</rewrite>
