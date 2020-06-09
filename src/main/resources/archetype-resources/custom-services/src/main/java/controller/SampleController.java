#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
package ${package}.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.intellective.commons.security.VuUserContext;
import ${package}.model.GreetingResult;

@RestController
@RequestMapping("/1.0")
public class SampleController {
    /**
     * Very simple Spring MVC POST service
     */
    @PostMapping("helloWorld")
    public GreetingResult helloWorld(@RequestParam("browser") String browser) {
        return GreetingResult.of(
                 String.format("Hello, %1${symbol_dollar}s! Thank you for using %2${symbol_dollar}s browser.", VuUserContext.get().getFullName(), browser));
    }
}
