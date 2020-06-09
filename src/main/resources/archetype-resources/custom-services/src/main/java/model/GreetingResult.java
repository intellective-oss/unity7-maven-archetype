#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
package ${package}.model;

public class GreetingResult {

	public static GreetingResult of(String message) {
		return new GreetingResult(message);
	}
	
	private String message;

	public GreetingResult() {
	}

	public GreetingResult(String message) {
		this.message = message;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}
